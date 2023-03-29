import Spinner from '@/components/shared/Spinner'
import { getTokenCandles } from '@/lib/getTokenCandles'
import {
  useGraphVisibleRange,
  useMarketToken,
  useTokenAddress,
} from '@/store/tokenStore'
import { useQuery } from '@tanstack/react-query'
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
  const marketToken = useMarketToken()

  const { data: candles } = useQuery({
    queryKey: [marketToken, frequency],
    queryFn: () => getTokenCandles(frequency, marketToken),
  })

  return (
    <div className="flex h-[65dvh] flex-col items-start pl-8 ">
      <>
        <ChartHeader />
        {candles ? <CandleChart data={candles ?? []} /> : <Spinner />}
      </>
    </div>
  )
}

export default ChartContainer
