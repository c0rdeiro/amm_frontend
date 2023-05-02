import {
  useCandlesInterval,
  useMarket,
  useTokenActions,
} from '@/store/tokenStore'
import { KlineData } from '@/types/next'
import {
  AreaData,
  HistogramData,
  ISeriesApi,
  OhlcData,
  UTCTimestamp,
} from 'lightweight-charts'
import { useEffect, useRef } from 'react'

import ChartWrapper from './ChartWrapper'
import { animateValue } from './Header/TokenPrice'
import Series from './Series'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind.config.cjs'

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
  const pnlSeries = useRef<ISeriesApi<'Area'>>(null)
  const { theme } = resolveConfig(tailwindConfig)
  const market = useMarket()
  const interval = useCandlesInterval()
  const { setTokenPrice } = useTokenActions()
  const prevAux = useRef<number | undefined>(undefined)

  useEffect(() => {
    const websocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${market.value.toLowerCase()}@kline_${
        interval.value
      }`
    )
    websocket.onmessage = (event) => {
      const raw_data: KlineData = JSON.parse(event.data)

      function setData(close: number) {
        try {
          candleSeries.current?.update({
            time: (raw_data.k.t / 1000) as UTCTimestamp,
            open: +raw_data.k.o,
            high: +raw_data.k.h,
            low: +raw_data.k.l,
            close: close,
          })
        } catch (err) {}
      }

      if (prevAux.current === undefined) {
        prevAux.current = +raw_data.k.c
      }
      if (
        candleSeries &&
        prevAux.current !== undefined &&
        Math.abs(prevAux.current - +raw_data.k.c) > 0.01
      ) {
        if (document.visibilityState !== 'hidden') {
          setTokenPrice(+raw_data.k.c)
          animateValue(prevAux.current, +raw_data.k.c, 500, (close: number) => {
            prevAux.current = close
            setData(close)
          })
        }
      }

      if (volumeSeries)
        volumeSeries.current?.update({
          time: (raw_data.k.t / 1000) as UTCTimestamp,
          value: +raw_data.k.v,
          color:
            +raw_data.k.o > +raw_data.k.c
              ? theme.colors.red[500]
              : theme.colors.green[500],
        })
    }
    return () => {
      websocket.close()
    }
  }, [market, interval])

  const pnlData: AreaData[] = candlesData.map((candle) => ({
    time: candle.time,
    value: 1840,
  })) // TODO value pnl
  return (
    <ChartWrapper>
      <Series ref={candleSeries} type={'candles'} initialData={candlesData} />
      <Series ref={volumeSeries} type={'volume'} initialData={volumeData} />
      <Series ref={pnlSeries} type={'pnlUp'} initialData={pnlData} />
      <Series ref={pnlSeries} type={'pnlDown'} initialData={pnlData} />
    </ChartWrapper>
  )
}

export default CandleChart
