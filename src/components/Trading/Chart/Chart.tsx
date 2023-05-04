import Spinner from '@/components/shared/Spinner'
import { getTokenData } from '@/lib/getTokenData'
import { useChartVisibleRange, useMarket } from '@/store/tokenStore'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import ChartHeader from './Header/ChartHeader'
import { useState } from 'react'

const Chart: React.FC = () => {
  const MarketChart = dynamic(
    () => import('@/components/Trading/Chart/MarketChart'),
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
  const [isCandleChart, setIsCandleChart] = useState<boolean>(true)

  return (
    <div className="mx-3 flex h-[80dvh] flex-col items-start rounded-lg border border-gray-500 bg-gray-600 p-2 md:p-5 lg:mx-0 lg:ml-5 lg:h-[62dvh]">
      <div className="relative h-full w-full rounded-lg bg-gray-700 px-2 pb-4">
        <ChartHeader
          isCandleChart={isCandleChart}
          setIsCandleChart={setIsCandleChart}
        />
        {data ? (
          <MarketChart
            candlesData={data.candles ?? []}
            volumeData={data.volume ?? []}
            pnlPrice={1840}
            isCandleChart={isCandleChart}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default Chart
