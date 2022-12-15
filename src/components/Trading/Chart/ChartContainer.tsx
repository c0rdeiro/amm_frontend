import ChartHeader from './Header/ChartHeader'
import dynamic from 'next/dynamic'
import dummyData from '@/dummydata.json'

const ChartContainer: React.FC = () => {
  const CandleChart = dynamic(
    () => import('@/components/Trading/Chart/CandleChart'),
    {
      loading: () => <p>Loading ...</p>,
      ssr: false,
    }
  )

  return (
    <div className="flex flex-col items-start gap-9 px-8 pb-8">
      <ChartHeader />
      <CandleChart data={dummyData} />
    </div>
  )
}

export default ChartContainer
