import lyra from '@/utils/getLyraSdk'
import { useQuery } from '@tanstack/react-query'
import MarketToken from './MarketToken'

const Market: React.FC = () => {
  const { data: markets } = useQuery({
    queryKey: ['markets'],
    queryFn: async () => await lyra.markets(),
    refetchInterval: 10000,
  })

  return (
    <div className="flex w-full shrink flex-col items-start gap-2">
      <div className="text-xs font-medium text-text-purple">Market</div>
      {markets?.map((market, index) => (
        <MarketToken key={index} market={market} />
      ))}
    </div>
  )
}

export default Market
