import tokenIcon from '@/hooks/tokenIcon'
import { useTokenActions } from '@/store/tokenStore'
import { MarketTokenType } from '@/types/next'
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
        4
        setToken(token)
        push('/trading')
      }}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2 py-3 2xl:gap-4">
        <div className="flex flex-row items-center gap-1 2xl:gap-4">
          {tokenIcon(token.label, 24)}
          <div className="">{token.label}</div>
        </div>
        <div className="text-text-purple">{`${token.priceCurrency} ${token.price}`}</div>
      </div>
    </button>
  )
}

export default MarketToken
