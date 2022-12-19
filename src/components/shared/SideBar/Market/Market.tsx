import { getTokens } from '@/lib/getTokens'
import { MarketTokenType } from '@/types/next'
import { useQuery } from '@tanstack/react-query'
import MarketToken from './MarketToken'

const Market: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['tokens'],
    queryFn: getTokens,
    refetchInterval: 5000,
  })
  const tokens: MarketTokenType[] = data ?? []

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
