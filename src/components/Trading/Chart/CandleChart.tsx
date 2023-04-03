import { useCandlesInterval, useMarketToken } from '@/store/tokenStore'
import { KlineData } from '@/types/next'
import {
  HistogramData,
  ISeriesApi,
  OhlcData,
  UTCTimestamp,
} from 'lightweight-charts'
import { useEffect, useRef } from 'react'
import ChartWrapper from './ChartWrapper'
import Series from './Series'

interface ChartProps {
  candlesData: OhlcData[]
  volumeData: HistogramData[]
}

const CandleChart: React.FC<ChartProps> = ({
  candlesData,
  volumeData,
}: ChartProps) => {
  const candleSeries = useRef<ISeriesApi<'Candlestick'>>(null)
  const volumeSeries = useRef<ISeriesApi<'Histogram'>>(null)
  const market = useMarketToken()
  const interval = useCandlesInterval()

  useEffect(() => {
    const websocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${market.toLowerCase()}@kline_${interval}`
    )
    websocket.onmessage = (event) => {
      const raw_data: KlineData = JSON.parse(event.data)

      if (candleSeries)
        candleSeries.current?.update({
          time: (raw_data.k.t / 1000) as UTCTimestamp,
          open: +raw_data.k.o,
          high: +raw_data.k.h,
          low: +raw_data.k.l,
          close: +raw_data.k.c,
        })

      if (volumeSeries)
        volumeSeries.current?.update({
          time: (raw_data.k.t / 1000) as UTCTimestamp,
          value: +raw_data.k.v,
          color: +raw_data.k.o > +raw_data.k.c ? '#952f34' : '#197148',
        })
    }
    return () => {
      console.log('WEBSOCKET CLOSE')

      websocket.close()
    }
  }, [market, interval])

  return (
    <ChartWrapper>
      <Series ref={candleSeries} type={'candles'} initialData={candlesData} />
      <Series ref={volumeSeries} type={'volume'} initialData={volumeData} />
    </ChartWrapper>
  )
}

export default CandleChart
