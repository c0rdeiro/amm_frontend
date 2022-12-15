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

    // lineSeries?.setData([
    //   {
    //     time: '2020-01-01',
    //     open: 200.0,
    //     high: 201.05302061083626,
    //     low: 192.50932917767153,
    //     close: 200.54699062497457,
    //   },
    //   {
    //     time: '2020-01-02',
    //     open: 200.54699062497457,
    //     high: 222.09958188538852,
    //     low: 184.02110347018152,
    //     close: 199.5517179097017,
    //   },
    //   {
    //     time: '2020-01-03',
    //     open: 199.5517179097017,
    //     high: 218.9341497250301,
    //     low: 163.73595332211198,
    //     close: 200.67709473121621,
    //   },
    //   {
    //     time: '2020-01-04',
    //     open: 200.67709473121621,
    //     high: 234.9928610428888,
    //     low: 161.52814487809502,
    //     close: 210.08957006443833,
    //   },
    //   {
    //     time: '2020-01-05',
    //     open: 210.08957006443833,
    //     high: 244.58780009089924,
    //     low: 168.6247564710401,
    //     close: 212.04329004932976,
    //   },
    //   {
    //     time: '2020-01-06',
    //     open: 212.04329004932976,
    //     high: 244.30186778533584,
    //     low: 181.92403889081075,
    //     close: 211.00547694694376,
    //   },
    //   {
    //     time: '2020-01-07',
    //     open: 211.00547694694376,
    //     high: 241.549015102326,
    //     low: 193.89427217016927,
    //     close: 212.31463546156422,
    //   },
    //   {
    //     time: '2020-01-08',
    //     open: 212.31463546156422,
    //     high: 220.78889167425356,
    //     low: 193.01238002719043,
    //     close: 218.20711349161235,
    //   },
    //   {
    //     time: '2020-01-09',
    //     open: 218.20711349161235,
    //     high: 253.09547858481102,
    //     low: 211.0913138427159,
    //     close: 219.18107526409864,
    //   },
    // ])
    console.log(data)

    data ? lineSeries?.setData(data) : undefined
    return () => {
      chart?.remove()
    }
  }, [])

  return <div ref={chartRef}></div>
}

export default Chart
