import Tabs from '@/components/shared/Tabs'
import { useTokenActions } from '@/store/tokenStore'
import { TabType } from '@/types/next'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'

const ChartOptions: React.FC = () => {
  const { setGraphVisibleRange: setVisibleRange } = useTokenActions()

  const intervalOptions: TabType[] = [
    {
      label: '1d',
      action: () => {
        setVisibleRange(getTimeRangeFromDays(1))
      },
    },
    {
      label: '1w',
      action: () => {
        setVisibleRange(getTimeRangeFromDays(7))
      },
    },
    {
      label: '1m',
      action: () => {
        setVisibleRange(getTimeRangeFromDays(30))
      },
    },
    {
      label: '3m',
      action: () => {
        setVisibleRange(getTimeRangeFromDays(90))
      },
    },
  ]

  return <Tabs tabList={intervalOptions} defaultIndex={2} />
}

export default ChartOptions
