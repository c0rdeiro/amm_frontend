import {
  useCandlesInterval,
  useMarket,
  useTokenActions,
  useTokenPrice,
} from '@/store/tokenStore'
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

const WS_UPDATE_SPEED = 1000 //ms
const UPDATE_TIMES = 4
const ITERATIONS_SPEED = WS_UPDATE_SPEED / UPDATE_TIMES

const CandleChart: React.FC<ChartProps> = ({
  candlesData,
  volumeData,
}: ChartProps) => {
  const candleSeries = useRef<ISeriesApi<'Candlestick'>>(null)
  const volumeSeries = useRef<ISeriesApi<'Histogram'>>(null)
  const market = useMarket()
  const interval = useCandlesInterval()
  const { setTokenPrice } = useTokenActions()
  const tokenPrice = useTokenPrice()

  useEffect(() => {
    const websocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${market.symbol.toLowerCase()}@kline_${interval}`
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

      if (!tokenPrice) {
        setTokenPrice(+raw_data.k.c)
      } else {
        const curr = +raw_data.k.c
        const delta = (curr - (tokenPrice ?? 0)) / UPDATE_TIMES
        let priceShown = tokenPrice
        for (let i = 0; i < UPDATE_TIMES; i++) {
          setTimeout(function () {
            priceShown += delta
            console.log('iteration data', {
              i,
              delta,
              priceShown,
              curr,
              tokenPrice,
              now: new Date().getTime(),
            })

            setTokenPrice(priceShown)
          }, ITERATIONS_SPEED)
        }
      }
    }
    return () => {
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
