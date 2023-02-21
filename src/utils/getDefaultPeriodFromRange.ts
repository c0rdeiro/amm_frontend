import { SnapshotPeriod } from '@lyrafinance/lyra-js'
import { TimeRange } from 'lightweight-charts'

export default function getDefaultPeriodFromRange(
  timeRange: TimeRange
): SnapshotPeriod {
  const hours =
    (parseFloat(timeRange.to.toString()) -
      parseFloat(timeRange.from.toString())) /
    60 /
    60

  switch (hours) {
    case 24: //1d
      return SnapshotPeriod.FifteenMinutes
    case 96: //4d
      return SnapshotPeriod.OneHour
    case 384: //16d
      return SnapshotPeriod.FourHours
    default:
      return SnapshotPeriod.FifteenMinutes
  }
}
