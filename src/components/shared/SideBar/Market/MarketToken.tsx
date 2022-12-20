import tokenIcon from '@/hooks/tokenIcon'
import { useTokenActions } from '@/store/tokenStore'
import { MarketTokenType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import { useRouter } from 'next/router'

type MarketTokenProps = {
  token: MarketTokenType
}

const MarketToken: React.FC<MarketTokenProps> = ({
  token,
}: MarketTokenProps) => {
  const { setToken } = useTokenActions()
  const { push } = useRouter()
  return (
    <button
      className="w-full"
      onClick={() => {
        setToken(token)
        push('/trading')
      }}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2 py-3 2xl:gap-4">
        <div className="flex flex-row items-center gap-1 2xl:gap-4">
          {tokenIcon(token.symbol, 24)}
          <div className="">{token.symbol}</div>
        </div>
        <div className="text-text-purple">
          {formatNumber(token.price, { decimalCases: 2, symbol: '$' })}
        </div>
      </div>
    </button>
  )
}

export default MarketToken
