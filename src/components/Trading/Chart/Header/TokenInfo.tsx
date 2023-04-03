import useChainlinkPricesQuery from '@/hooks/useChainlinkPriceQuery'
import LINKIcon from '@/Icons/tokens/link'
import { getToken24h, Token24hData } from '@/lib/getToken24h'
import { useMarketToken, useTokenChartHoverInfo } from '@/store/tokenStore'
import { TokenInfoType } from '@/types/next'
import { useQuery } from '@tanstack/react-query'
import { formatEther } from 'viem'

import TokenInfoItem from './TokenInfoItem'

const TokenInfo: React.FC = () => {
  const marketToken = useMarketToken()

  const { data } = useQuery<Token24hData>({
    queryKey: ['24h', marketToken],
    queryFn: () => getToken24h(marketToken),
  })

  const { data: chainLinkData } = useChainlinkPricesQuery(marketToken)

  const items: TokenInfoType[] = [
    {
      label: '24h Change',
      value: data?.change ?? 0,
      type: '%',
      colorMode: 'redgreen',
    },
    {
      label: (
        <div className="flex gap-1">
          <LINKIcon size={15} /> Price
        </div>
      ),
      value: chainLinkData?.price
        ? parseFloat(formatEther(chainLinkData.price))
        : 0,
      type: '$',
    },
    {
      label: '24h High',
      value: data?.high ?? 0,
      type: '$',
    },
    {
      label: '24h Low',
      value: data?.low ?? 0,
      type: '$',
    },
    {
      label: 'Open Interest',
      value: 0,
      type: '$',
    },
  ]
  const chartHoverInfo = useTokenChartHoverInfo()

  return (
    <div className="flex flex-row items-start gap-6">
      {chartHoverInfo
        ? chartHoverInfo.map((item, index) => (
            <TokenInfoItem key={index} tokenInfo={item} />
          ))
        : items.map((item, index) => (
            <TokenInfoItem key={index} tokenInfo={item} />
          ))}
    </div>
  )
}

export default TokenInfo
