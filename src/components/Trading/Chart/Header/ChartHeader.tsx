import { Dispatch, SetStateAction } from 'react'
import ChartOptions from './ChartOptions'
import TokenInfo from './TokenInfo'
import TokenSelect from './TokenSelect'

type ChartHeaderProps = {
  isCandleChart: boolean
  setIsCandleChart: Dispatch<SetStateAction<boolean>>
}

const ChartHeader: React.FC<ChartHeaderProps> = ({
  isCandleChart,
  setIsCandleChart,
}) => {
  return (
    <div className="absolute left-0 top-0 z-40 flex w-full flex-col items-start justify-between gap-4 rounded-lg bg-opacity-10 py-1 pl-1 pr-0 backdrop-blur-xs md:left-9 md:flex-row md:pt-9 md:pr-36 lg:left-12 lg:items-start lg:gap-0 lg:py-0 lg:pt-5 lg:pl-0 ">
      <div className="flex flex-col lg:flex-row lg:gap-7">
        <TokenSelect />
        <TokenInfo />
      </div>
      <ChartOptions
        isCandleChart={isCandleChart}
        setIsCandleChart={setIsCandleChart}
      />
    </div>
  )
}

export default ChartHeader
