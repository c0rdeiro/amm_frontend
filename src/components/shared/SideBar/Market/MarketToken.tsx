import tokenIcon from '@/hooks/tokenIcon'
import { useTokenActions } from '@/store/tokenStore'
import formatNumber from '@/utils/formatNumber'
import getMarketName from '@/utils/getMarketName'
import { Market } from '@lyrafinance/lyra-js'
import { formatEther } from 'ethers/lib/utils.js'
import { useRouter } from 'next/router'

type MarketTokenProps = {
  market: Market
}

const MarketToken: React.FC<MarketTokenProps> = ({
  market,
}: MarketTokenProps) => {
  const { push } = useRouter()
  const { setTokenAddress: setToken } = useTokenActions()

  return (
    <button
      className="w-full"
      onClick={() => {
        push(`/trading/${getMarketName(market).toLowerCase()}`)
      }}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2 py-3 2xl:gap-4">
        <div className="flex flex-row items-center gap-1 2xl:gap-4">
          {tokenIcon(getMarketName(market), 24)}
          <div className="">{getMarketName(market)}</div>
        </div>
        <div className="text-text-purple">
          {formatNumber(parseFloat(formatEther(market.spotPrice)), {
            decimalCases: 2,
            symbol: '$',
          })}
        </div>
      </div>
    </button>
  )
}

export default MarketToken
