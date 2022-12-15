import type { TimeRange, UTCTimestamp } from 'lightweight-charts'

export default function getTimeRangeFromDays(days: number): TimeRange {
  return {
    from: (new Date().setDate(new Date().getDate() - days) /
      1000) as UTCTimestamp,
    to: (Date.now() / 1000) as UTCTimestamp,
  }
}
