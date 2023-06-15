import Button from '@/components/shared/Button'
import Select from '@/components/shared/Form/Select'
import { useCandlesInterval, useTokenActions } from '@/store/tokenStore'
import { CandlesInterval } from '@/types/next'
import { Dispatch, SetStateAction } from 'react'
import { AiOutlineLineChart } from 'react-icons/ai'
import { BiCandles } from 'react-icons/bi'

type ChartOptionsProps = {
  isCandleChart: boolean
  setIsCandleChart: Dispatch<SetStateAction<boolean>>
}

const ChartOptions: React.FC<ChartOptionsProps> = ({
  isCandleChart,
  setIsCandleChart,
}) => {
  const { setCandlesInterval } = useTokenActions()
  const candlesInterval = useCandlesInterval()

  const intervalOptions: {
    value: CandlesInterval
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
        rightIcon={
          isCandleChart ? (
            <AiOutlineLineChart size={20} />
          ) : (
            <BiCandles size={20} />
          )
        }
        onClick={() => setIsCandleChart((prev) => !prev)}
      />
    </div>
  )
}

export default ChartOptions
