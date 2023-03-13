import InfoRow from './InfoRow'
import TokenSelect from './TokenSelect'

const ChartHeader: React.FC = () => {
  return (
    <div className="z-40 flex w-full items-start gap-6">
      <TokenSelect />
      <InfoRow />
    </div>
  )
}

export default ChartHeader
