import Button from '@/components/shared/Button'
import Select from '@/components/shared/Form/Select'
import { useCandlesInterval, useTokenActions } from '@/store/tokenStore'
import { CandlesIntervals } from '@/types/next'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'
import { AiOutlineLineChart } from 'react-icons/ai'

const ChartOptions: React.FC = () => {
  const { setChartVisibleRange: setVisibleRange, setCandlesInterval } =
    useTokenActions()
  const candlesInterval = useCandlesInterval()

  const intervalOptions: {
    value: CandlesIntervals
    label: string
    insideLabel?: string
  }[] = [
    {
      value: '15m',
      label: '15m',
      insideLabel: '15 minutes',
    },
    {
      value: '1h',
      label: '1h',
      insideLabel: '1 hour',
    },
    {
      value: '4h',
      label: '4h',
      insideLabel: '4 hours',
    },
  ]

  return (
    <div className="flex items-center gap-3 rounded bg-gray-500 px-4">
      <Select
        items={intervalOptions}
        selectedItem={candlesInterval}
        setSelectedItem={setCandlesInterval}
        hideArrow
        style="no-style"
        textColor="white"
      />
      <div className="h-5 border border-gray-200" />
      <Button
        label=""
        styleType="monochromatic"
        size="nopadding"
        rightIcon={<AiOutlineLineChart size={20} />}
      />
    </div>
  )
}

export default ChartOptions
