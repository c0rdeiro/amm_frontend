import {
  CandlesInterval,
  KlineData,
  SupportedMarketSymbols,
} from '@/types/next'
import { OhlcData, UTCTimestamp } from 'lightweight-charts'
import { useEffect } from 'react'

export default function useMarketLivePrice(
  marketSymbol: SupportedMarketSymbols,
  interval: CandlesInterval
): (OhlcData & { volume: number }) | undefined {
  let data: (OhlcData & { volume: number }) | undefined = undefined

  useEffect(() => {
    const websocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${marketSymbol.toLowerCase()}@kline_${interval}`
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
  }, [marketSymbol, interval])

  return data
}
