import { tokens } from '@/constants'
import MarketToken from './MarketToken'

const Market: React.FC = () => {
  return (
    <div className="flex w-full shrink flex-col items-start gap-2">
      <div className="text-xs font-medium text-text-purple">Market</div>
      {tokens.map((token, index) => (
        <MarketToken key={index} token={token} />
      ))}
    </div>
  )
}

export default Market
