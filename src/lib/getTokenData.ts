import { CandlesInterval, SupportedMarketSymbols } from '@/types/next'
import { HistogramData, OhlcData, UTCTimestamp } from 'lightweight-charts'

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

export async function getTokenData(
  market: SupportedMarketSymbols,
  interval: CandlesInterval
): Promise<{ candles: OhlcData[]; volume: HistogramData[] }> {
  const candles: BinanceCandleData[] = await (
    await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${market}&interval=${interval}&limit=1000`
    )
  ).json()

  const res: { candles: OhlcData[]; volume: HistogramData[] } = {
    candles: [],
    volume: [],
  }
  candles.forEach((candle: BinanceCandleData) => {
    res.candles.push({
      time: (candle[0] / 1000) as UTCTimestamp, //has to be divided by 1000 bc chart takes unix in seconds and binances gives unix in milliseconds
      open: +candle[1],
      high: +candle[2],
      close: +candle[4],
      low: +candle[3],
    })
    res.volume.push({
      time: (candle[0] / 1000) as UTCTimestamp,
      value: +candle[5],
      color: +candle[1] > +candle[4] ? '#952f34' : '#197148',
    })
  })

  return res
}
