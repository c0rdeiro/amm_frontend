import { CandlesIntervals, SupportedMarket } from '@/types/next'
import getDefaultPeriodFromRange from '@/utils/getDefaultPeriodFromRange'
import { OhlcData, TimeRange, UTCTimestamp } from 'lightweight-charts'

type BinanceCandleData = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Unused field, ignore.
]

export async function getTokenCandles(
  timeRange: TimeRange,
  market: SupportedMarket,
  _interval?: CandlesIntervals
): Promise<(OhlcData & { volume: number })[]> {
  const interval = _interval ?? getDefaultPeriodFromRange(timeRange)

  const candles: BinanceCandleData[] = await (
    await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${market}&interval=${interval}&startTime=${
        timeRange.from.toString().split('.')[0]
      }000&limit=1000`
    )
  ).json()

  const res: (OhlcData & { volume: number })[] = candles.map(
    (candle: BinanceCandleData) => ({
      time: (candle[0] / 1000) as UTCTimestamp, //has to be divided by 1000 bc chart takes unix in seconds and binances gives unix in milliseconds
      open: +candle[1],
      high: +candle[2],
      close: +candle[4],
      low: +candle[3],
      volume: +candle[5],
    })
  )

  return res
}
