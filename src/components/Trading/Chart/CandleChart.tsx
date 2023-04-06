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

const WS_UPDATE_SPEED = 1500 //ms
const UPDATE_TIMES = 8
// const ITERATIONS_SPEED = WS_UPDATE_SPEED / UPDATE_TIMES

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
        const delta = curr - (tokenPrice ?? 0)
        console.log({ delta, tokenPrice })

        if (delta === 0) return
        else {
          animateValue(
            Number(tokenPrice.toFixed(2)),
            Number(curr.toFixed(2)),
            WS_UPDATE_SPEED,
            setTokenPrice
          )
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

//Quadratic easing
function quadratic(duration: number, range: number, current: number) {
  return ((duration * 3) / Math.pow(range, 3)) * Math.pow(current, 2)
}

function animateValue(
  start: number,
  end: number,
  duration: number,
  setTokenPrice: (tokenPrice: number) => void
) {
  let range = Math.abs(end - start)
  let current = Number(start.toFixed(2))
  let increment = end > start ? 0.01 : -0.01
  // var startTime = new Date()
  // var offset = 1
  // var remainderTime = 0
  console.log('ANIMATE', { increment, current, range, start, end })
  if (range === 0) return
  const step = function () {
    current += increment
    setTokenPrice(current)
    if (Number(current.toFixed(2)) != end) {
      console.log('RECURSIVE', { current, end })

      setTimeout(step, quadratic(duration, range, current))
    } else {
      console.log('ACABOUUUU')
      return
    }
  }

  setTimeout(step, quadratic(duration, range, start))
}

export default CandleChart
