import ChartOptions from './ChartOptions'
import TokenInfo from './TokenInfo'
import TokenSelect from './TokenSelect'

const ChartHeader: React.FC = () => {
  return (
    <div className="absolute top-5 left-12 z-40 flex w-full items-center gap-28">
      <div className="flex gap-7">
        <TokenSelect />
        <TokenInfo />
      </div>
      <ChartOptions />
    </div>
  )
}

export default ChartHeader
