import { getTokenCandles } from '@/lib/getTokenCandles'
import { useTokenChartHoverInfo } from '@/store/tokenStore'
import { TokenInfoType } from '@/types/next'
import lyra from '@/utils/getLyraSdk'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'
import { SnapshotPeriod } from '@lyrafinance/lyra-js'
import { useQuery } from '@tanstack/react-query'
import { formatEther } from 'ethers/lib/utils.js'
import { useEffect } from 'react'
import TokenInfoItem from './TokenInfoItem'

const TokenInfo: React.FC = () => {
  const { data: market } = useQuery({
    queryKey: ['market', '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'],
    queryFn: async () =>
      await lyra.market('0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'), //TODO: change::::this should be a constant
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

  const prev = lastCandle ? lastCandle[0]?.open : 0
  const change =
    market && prev
      ? (parseFloat(formatEther(market.spotPrice)) - prev) / prev
      : 0
  const items: TokenInfoType[] = [
    { label: '24h Change', value: change, type: '%', colorMode: 'redgreen' },
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
        lastCandle?.reduce((prev, curr) => (prev.low < curr.low ? curr : prev))
          .low ?? 0,
      type: '$',
    },
    {
      label: 'Open Interest',
      value: market ? parseFloat(formatEther(market.openInterest)) : 0,
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
