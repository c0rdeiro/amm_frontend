import Spinner from '@/components/shared/Spinner'
import { getTokenCandles } from '@/lib/getTokenCandles'
import { useGraphVisibleRange, useTokenAddress } from '@/store/tokenStore'
import lyra from '@/utils/getLyraSdk'
import { useQuery } from '@tanstack/react-query'
import { formatEther } from 'ethers/lib/utils.js'
import dynamic from 'next/dynamic'

import ChartHeader from './Header/ChartHeader'

const ChartContainer: React.FC = () => {
  const CandleChart = dynamic(
    () => import('@/components/Trading/Chart/CandleChart'),
    {
      loading: () => <Spinner />,
      ssr: false,
    }
  )

  const frequency = useGraphVisibleRange()
  const tokenAddress = useTokenAddress()

  const { data: market } = useQuery({
    queryKey: ['market', tokenAddress],
    queryFn: async () => await lyra.market(tokenAddress),
    refetchInterval: 10000,
  })

  const { data: candles } = useQuery({
    queryKey: ['candles', market?.baseToken.symbol, frequency],
    queryFn: () => getTokenCandles(frequency, market),
    enabled: !!market,
    select: (data) => {
      if (!market) return data
      const lastCandle = data[data.length - 1]
      if (!lastCandle) return

      const livePrice = parseFloat(formatEther(market.spotPrice))
      lastCandle.close = livePrice
      lastCandle.high = Math.max(lastCandle.high, livePrice)
      lastCandle.low = Math.min(lastCandle.low, livePrice)

      data.splice(data.length - 1, 1, lastCandle)

      return data
    },
  })

  return (
    <div className="flex h-[65dvh] flex-col items-start px-8 ">
      <>
        <ChartHeader />
        {candles ? <CandleChart data={candles ?? []} /> : <Spinner />}
      </>
    </div>
  )
}

export default ChartContainer
