import Spinner from '@/components/shared/Spinner'
import { getTokenData } from '@/lib/getTokenData'
import { useGraphVisibleRange, useMarketToken } from '@/store/tokenStore'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import ChartHeader from './Header/ChartHeader'

const Chart: React.FC = () => {
  const CandleChart = dynamic(
    () => import('@/components/Trading/Chart/CandleChart'),
    {
      loading: () => <Spinner />,
      ssr: false,
    }
  )

  const frequency = useGraphVisibleRange()
  const marketToken = useMarketToken()

  const { data } = useQuery({
    queryKey: [marketToken, frequency],
    queryFn: () => getTokenData(frequency, marketToken),
  })

  return (
    <div className="flex h-[65dvh] flex-col items-start pl-8 ">
      <>
        <ChartHeader />
        {data ? (
          <CandleChart
            candlesData={data.candles ?? []}
            volumeData={data.volume ?? []}
          />
        ) : (
          <Spinner />
        )}
      </>
    </div>
  )
}

export default Chart
