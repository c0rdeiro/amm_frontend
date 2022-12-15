import ChartOptions from './ChartOptions'
import TokenInfo from './TokenInfo'

const InfoRow: React.FC = () => {
  return (
    <div className="flex w-full flex-row items-end justify-between gap-6">
      <TokenInfo />
      <ChartOptions />
    </div>
  )
}

export default InfoRow
