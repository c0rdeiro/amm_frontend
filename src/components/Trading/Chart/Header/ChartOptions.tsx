import Tabs from '@/components/shared/Tabs'
import { useTokenActions } from '@/store/tokenStore'
import { TabType } from '@/types/next'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'

const ChartOptions: React.FC = () => {
  const { setGraphVisibleRange: setVisibleRange } = useTokenActions()

  const intervalOptions: TabType[] = [
    {
      label: '15min',
      action: () => {
        setVisibleRange(getTimeRangeFromDays(1))
      },
    },
    {
      label: '1h',
      action: () => {
        setVisibleRange(getTimeRangeFromDays(4))
      },
    },
    {
      label: '4h',
      action: () => {
        setVisibleRange(getTimeRangeFromDays(16))
      },
    },
  ]

  return (
    <div className="flex">
      <Tabs tabList={intervalOptions} defaultIndex={0} />
    </div>
  )
}

export default ChartOptions
