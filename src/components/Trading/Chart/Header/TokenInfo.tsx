import useChainlinkPricesQuery from '@/hooks/useChainlinkPriceQuery'
import LINKIcon from '@/Icons/tokens/link'
import { getTokenCandles } from '@/lib/getTokenCandles'
import { useTokenAddress, useTokenChartHoverInfo } from '@/store/tokenStore'
import { TokenInfoType } from '@/types/next'
import lyra from '@/utils/getLyraSdk'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'
import { SnapshotPeriod } from '@lyrafinance/lyra-js'
import { useQuery } from '@tanstack/react-query'
import { formatEther as formatEtherETH } from 'ethers/lib/utils.js'
import { useRouter } from 'next/router'
import { formatEther } from 'viem'

import TokenInfoItem from './TokenInfoItem'

const TokenInfo: React.FC = () => {
  const router = useRouter()
  const marketName = router.asPath.split('/').pop()

  const tokenAddress = useTokenAddress()
  const { data: market } = useQuery({
    queryKey: ['market', tokenAddress],
    queryFn: async () => await lyra.market(tokenAddress),
    refetchInterval: 10000,
  })

  const { data: lastCandle } = useQuery({
    queryKey: ['lastCandle'],
    queryFn: () =>
      getTokenCandles(
        getTimeRangeFromDays(1),
        market,
        SnapshotPeriod.EightHours
      ),
    enabled: !!market,
    refetchInterval: 10000,
  })

  const { data } = useChainlinkPricesQuery(marketName)

  const prev = lastCandle ? lastCandle[0]?.open : 0
  const change =
    market && prev
      ? (parseFloat(formatEtherETH(market.spotPrice)) - prev) / prev
      : 0
  const items: TokenInfoType[] = [
    { label: '24h Change', value: change, type: '%', colorMode: 'redgreen' },
    {
      label: (
        <div className="flex gap-1">
          <LINKIcon size={15} /> Price
        </div>
      ),
      value: data?.price ? parseFloat(formatEther(data.price)) : 0,
      type: '$',
    },
    {
      label: '24h High',
      value:
        lastCandle?.reduce((prev, curr) =>
          prev.high < curr.high ? curr : prev
        ).high ?? 0,
      type: '$',
    },
    {
      label: '24h Low',
      value:
        lastCandle?.reduce((prev, curr) => (prev.low > curr.low ? curr : prev))
          .low ?? 0,
      type: '$',
    },
    {
      label: 'Open Interest',
      value: market ? parseFloat(formatEtherETH(market.openInterest)) : 0,
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
