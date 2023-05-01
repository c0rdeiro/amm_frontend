import Spinner from '@/components/shared/Spinner'
import { getTokenData } from '@/lib/getTokenData'
import { useChartVisibleRange, useMarket } from '@/store/tokenStore'
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

  const frequency = useChartVisibleRange()
  const marketToken = useMarket()

  const { data } = useQuery({
    queryKey: [marketToken.value, frequency],
    queryFn: () => getTokenData(frequency, marketToken.value),
  })

  return (
    <div className="ml-5 flex h-[62dvh] flex-col items-start rounded-lg border border-gray-500 bg-gray-600 p-5">
      <div className="relative h-full w-full rounded-lg bg-gray-700 px-2 pb-4">
        <ChartHeader />
        {data ? (
          <CandleChart
            candlesData={data.candles ?? []}
            volumeData={data.volume ?? []}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default Chart
