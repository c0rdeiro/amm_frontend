import { useTokenActions } from '@/store/tokenStore'
import { CandlesIntervals, SupportedMarket } from '@/types/next'
import { OhlcData, UTCTimestamp } from 'lightweight-charts'
import { useEffect } from 'react'

type KlineData = {
  e: 'kline' // Event type
  E: number // Event time
  s: string // Symbol
  k: {
    t: number // Kline start time
    T: number // Kline close time
    s: string // Symbol
    i: string // Interval
    f: number // First trade ID
    L: number // Last trade ID
    o: string // Open price
    c: string // Close price
    h: string // High price
    l: string // Low price
    v: string // Base asset volume
    n: number // Number of trades
    x: boolean // Is this kline closed?
    q: string // Quote asset volume
    V: string // Taker buy base asset volume
    Q: string // Taker buy quote asset volume
    B: string // Ignore
  }
}

export default function useMarketLivePrice(
  market: SupportedMarket,
  interval: CandlesIntervals
): (OhlcData & { volume: number }) | undefined {
  let data: (OhlcData & { volume: number }) | undefined = undefined
  const { setTokenOhlcv } = useTokenActions()

  useEffect(() => {
    const websocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${market.toLowerCase()}@kline_${interval}`
    )
    websocket.onmessage = (event) => {
      const raw_data: KlineData = JSON.parse(event.data)
      data = {
        time: (raw_data.k.t / 1000) as UTCTimestamp,
        open: +raw_data.k.o,
        high: +raw_data.k.h,
        low: +raw_data.k.l,
        close: +raw_data.k.c,
        volume: +raw_data.k.v,
      }
    }
    return () => {
      websocket.close()
    }
  }, [market, interval])

  return data
}
