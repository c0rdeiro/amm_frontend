import useChainlinkPricesQuery from '@/hooks/useChainlinkPriceQuery'
import LINKIcon from '@/Icons/tokens/link'
import { getToken24h, Token24hData } from '@/lib/getToken24h'
import { useMarket, useTokenChartHoverInfo } from '@/store/tokenStore'
import { TokenInfoType } from '@/types/next'
import { useQuery } from '@tanstack/react-query'

import TokenInfoItem from './TokenInfoItem'
import { formatEther } from 'ethers/lib/utils.js'

const TokenInfo: React.FC = () => {
  const marketToken = useMarket()

  const { data } = useQuery<Token24hData>({
    queryKey: ['24h', marketToken],
    queryFn: () => getToken24h(marketToken.symbol),
  })

  const { data: chainLinkData } = useChainlinkPricesQuery(marketToken.symbol)

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
    // {
    //   label: 'Open Interest',
    //   value: 0,
    //   type: '$',
    // },
  ]
  const chartHoverInfo = useTokenChartHoverInfo()

  return (
    <div className="flex flex-row items-center gap-4  lg:gap-6">
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
