import { CandlesIntervals } from '@/types/next'
import { TimeRange } from 'lightweight-charts'

export default function getDefaultPeriodFromRange(
  timeRange: TimeRange
): CandlesIntervals {
  const hours =
    (parseFloat(timeRange.to.toString()) -
      parseFloat(timeRange.from.toString())) /
    60 /
    60

  switch (hours) {
    case 24: //1d
      return '15m'
    case 96: //4d
      return '1h'
    case 384: //16d
      return '4h'
    default:
      return '15m'
  }
}
