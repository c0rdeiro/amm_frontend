import { CandlesInterval } from '@/types/next'
import getTimeRangeFromDays from './getTimeRangeFromDays'

export default function getVisibleRangeFromCandleInterval(
  candlesInterval: CandlesInterval
) {
  switch (candlesInterval) {
    case '15m':
      return getTimeRangeFromDays(1)
    case '1h':
      return getTimeRangeFromDays(4)
    case '4h':
      return getTimeRangeFromDays(16)
    case '8h':
      return getTimeRangeFromDays(64)
    case '1d':
      return getTimeRangeFromDays(256)
  }
}
