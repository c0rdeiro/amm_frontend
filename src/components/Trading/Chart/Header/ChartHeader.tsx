import ChartOptions from './ChartOptions'
import TokenInfo from './TokenInfo'
import TokenSelect from './TokenSelect'

const ChartHeader: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 z-40 flex  w-full flex-col items-start justify-between gap-4 rounded-lg bg-opacity-10 py-1 pl-1 pr-0 backdrop-blur-xs md:flex-row lg:top-5 lg:left-12 lg:items-start lg:gap-0 lg:py-0 lg:pl-0 lg:pr-96">
      <div className="flex flex-col lg:flex-row lg:gap-7">
        <TokenSelect />
        <TokenInfo />
      </div>
      <ChartOptions />
    </div>
  )
}

export default ChartHeader
