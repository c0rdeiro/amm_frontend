import ChartHeader from './Header/ChartHeader'
import dynamic from 'next/dynamic'
import dummyData from '@/dummydata.json'
import { useQuery } from '@tanstack/react-query'
import { useGraphVisibleRange } from '@/store/tokenStore'
import { getTokenCandles } from '@/lib/getTokenCandles'
import { OhlcData } from 'lightweight-charts'
import { useRouter } from 'next/router'

const ChartContainer: React.FC = () => {
  const CandleChart = dynamic(
    () => import('@/components/Trading/Chart/CandleChart'),
    {
      loading: () => (
        <div className="flex items-center justify-center">Loading ...</div>
      ),
      ssr: false,
    }
  )

  const frequency = useGraphVisibleRange()
  const router = useRouter()
  const tokenSymbol = router.asPath.split('/').pop()

  const { data } = useQuery({
    queryKey: ['tokenCandles', tokenSymbol],
    queryFn: () => getTokenCandles(tokenSymbol ?? '', frequency.toString()), //TODO: check frequency
    enabled: !!tokenSymbol,
    refetchInterval: 5000,
  })

  // const data: OhlcData[] = [
  //   {
  //     time: '2022-02-01',
  //     open: 200.54699062497457,
  //     high: 222.09958188538852,
  //     low: 184.02110347018152,
  //     close: 199.5517179097017,
  //   },
  // ]
  // console.log(data)

  return (
    <div className="flex flex-col items-start gap-9 px-8 pb-8">
      {data ? (
        <>
          <ChartHeader />
          <CandleChart data={dummyData} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default ChartContainer
