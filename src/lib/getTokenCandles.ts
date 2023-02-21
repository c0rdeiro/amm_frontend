import getDefaultPeriodFromRange from '@/utils/getDefaultPeriodFromRange'
import { Market, MarketSpotCandle, SnapshotPeriod } from '@lyrafinance/lyra-js'
import { formatEther } from 'ethers/lib/utils.js'
import { OhlcData, TimeRange, UTCTimestamp } from 'lightweight-charts'

export async function getTokenCandles(
  timeRange: TimeRange,
  market?: Market,
  _period?: SnapshotPeriod
): Promise<OhlcData[]> {
  if (!market) return []

  const period = _period ?? getDefaultPeriodFromRange(timeRange)

  const candles: MarketSpotCandle[] = await market?.spotPriceHistory({
    startTimestamp: parseInt(timeRange.from.toString()),
    endTimestamp: parseInt(timeRange.to.toString()),
    period: period,
  })

  const res: OhlcData[] = candles.map((candle: MarketSpotCandle) => ({
    time: candle.endTimestamp as UTCTimestamp,
    open: parseFloat(formatEther(candle.open)),
    high: parseFloat(formatEther(candle.high)),
    close: parseFloat(formatEther(candle.close)),
    low: parseFloat(formatEther(candle.low)),
  }))

  return res
}
