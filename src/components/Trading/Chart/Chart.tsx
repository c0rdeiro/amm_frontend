import { createChart, OhlcData } from 'lightweight-charts'
import { useEffect, useRef } from 'react'

interface ChartProps {
  data: OhlcData[]
}

const Chart: React.FC<ChartProps> = ({ data }: ChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chart = chartRef.current
      ? createChart(chartRef.current, { width: 400, height: 300 })
      : null

    const lineSeries = chart?.addCandlestickSeries()

    data ? lineSeries?.setData(data) : undefined
    return () => {
      chart?.remove()
    }
  }, [])

  return <div ref={chartRef}></div>
}

export default Chart
