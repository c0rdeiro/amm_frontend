import Tabs from '@/components/shared/Tabs'
import { useTokenActions } from '@/store/tokenStore'
import { TabType } from '@/types/next'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'

const ChartOptions: React.FC = () => {
  const { setGraphVisibleRange: setVisibleRange, setCandlesInterval } =
    useTokenActions()

  const intervalOptions: TabType[] = [
    {
      key: 0,
      label: '15min',
      action: () => {
        setVisibleRange(getTimeRangeFromDays(1))
        setCandlesInterval('15m')
      },
    },
    {
      key: 1,
      label: '1h',
      action: () => {
        setVisibleRange(getTimeRangeFromDays(4))
        setCandlesInterval('1h')
      },
    },
    {
      key: 2,
      label: '4h',
      action: () => {
        setVisibleRange(getTimeRangeFromDays(16))
        setCandlesInterval('4h')
      },
    },
  ]

  return (
    <div className="flex pb-2 pr-5">
      <Tabs
        tabList={intervalOptions}
        defaultIndex={0}
        size="sm"
        style="monochromatic"
      />
    </div>
  )
}

export default ChartOptions
