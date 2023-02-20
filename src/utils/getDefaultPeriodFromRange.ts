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
    case 168: //1w
      return SnapshotPeriod.FourHours
    case 720: //1m
      return SnapshotPeriod.EightHours
    default:
      return SnapshotPeriod.FifteenMinutes
  }
}
