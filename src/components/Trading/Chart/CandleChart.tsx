import { useGraphVisibleRange, useTokenActions } from '@/store/tokenStore'
import { TokenInfoType } from '@/types/next.js'
import { getPercentage } from '@/utils/getPercentage'
import dateFormat from 'dateformat'
import {
  ChartOptions,
  ColorType,
  createChart,
  DeepPartial,
  OhlcData,
  SeriesMarker,
  SeriesMarkerPosition,
  Time,
  UTCTimestamp,
} from 'lightweight-charts'
import { useEffect, useRef } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../../tailwind.config.cjs'

const formatTickDates = (time: UTCTimestamp) => {
  return dateFormat(new Date(time * 1000), `mmm d, h TT`)
}

const STATIC_CHART_OPTIONS: DeepPartial<ChartOptions> = {
  grid: {
    vertLines: {
      color: 'rgba(154, 154, 175, 0.1)',
    },
    horzLines: {
      color: 'rgba(154, 154, 175, 0.1)',
    },
  },
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
    fixLeftEdge: true,
    fixRightEdge: true,
    borderVisible: false,
    barSpacing: 10,
    // tickMarkFormatter: formatTickDates,
  },
  rightPriceScale: {
    scaleMargins: {
      top: 0.1,
      bottom: 0.05,
    },
    entireTextOnly: true,
    borderVisible: false,
    // drawTicks: false,
  },
}

type CandleChartProps = {
  data: OhlcData[]
}

const CandleChart: React.FC<CandleChartProps> = ({
  data,
}: CandleChartProps) => {
  // const tailwind = resolveConfig(tailwindConfig)
  const visibleRange = useGraphVisibleRange()
  const { setChartHoverInfo, clearChartHoverInfo } = useTokenActions()

  const chartContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart?.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    const chart = chartContainerRef.current
      ? createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          layout: {
            background: {
              type: ColorType.Solid,
              color: 'transparent',
            },
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            textColor: '#9A9AAF',
          },
          crosshair: {
            mode: 0,
            vertLine: {
              color: '#9A9AAF66', //tailwind?.theme?.colors?['purple'] //TODO: import colors from tailwind
              width: 2,
            },
            horzLine: {
              color: '#9A9AAF66',
              width: 2,
            },
          },

          ...STATIC_CHART_OPTIONS,
        })
      : null

    // Get the current users primary locale
    const currentLocale = window.navigator.languages[0]
    // Create a number format using Intl.NumberFormat
    const myPriceFormatter = (number: number) =>
      Intl.NumberFormat(currentLocale, {
        style: 'currency',
        currency: 'USD', // Currency for data points
        minimumFractionDigits: number % 1 ? 2 : 0,
      }).format(number)

    // const myTimeFormatter = Intl.NumberFormat(currentLocale, {
    //   style: 'time',
    // })

    chart?.applyOptions({
      localization: {
        priceFormatter: myPriceFormatter,
        // timeFormatter: (time: Time) => '9AM',
      },
    })

    const candleSeries = chart?.addCandlestickSeries({
      upColor: '#20b26c',
      downColor: '#ef454a',
      wickUpColor: '#20b26c',
      wickDownColor: '#ef454a',
      borderVisible: false,
    })
    candleSeries?.setData(data)

    const markers: SeriesMarker<Time>[] = [
      {
        time: data[data.length - 6]!!.time,
        position: 'aboveBar',
        color: '#ef454a',
        shape: 'arrowDown',
      },
      {
        time: data[data.length - 10]!!.time,
        position: 'belowBar',
        color: '#20b26c',
        shape: 'arrowUp',
      },
      {
        time: data[data.length - 10]!!.time,
        position: 'belowBar',
        color: '#20b26c',
        shape: 'arrowUp',
      },
      {
        time: data[data.length - 51]!!.time,
        position: 'belowBar',
        color: '#20b26c',
        shape: 'arrowUp',
      },
      {
        time: data[data.length - 51]!!.time,
        position: 'belowBar',
        color: '#20b26c',
        shape: 'arrowUp',
      },
      {
        time: data[data.length - 51]!!.time,
        position: 'belowBar',
        color: '#20b26c',
        shape: 'arrowUp',
      },
      {
        time: data[data.length - 51]!!.time,
        position: 'belowBar',
        color: '#20b26c',
        shape: 'arrowUp',
      },
    ]
    candleSeries?.setMarkers(markers)

    visibleRange
      ? chart?.timeScale().setVisibleRange(visibleRange)
      : chart?.timeScale().fitContent()

    window.addEventListener('resize', handleResize)

    chart?.subscribeCrosshairMove((param) => {
      if (param.time && param.seriesPrices.size) {
        const val = param.seriesPrices.values().next().value
        const items: TokenInfoType[] = [
          {
            label: 'Change',
            type: '%',
            value: getPercentage(val.close - val.open, val.close),
            colorMode: 'redgreen',
          },
          {
            label: 'Open',
            type: '$',
            value: val.open,
            colorMode: 'blue',
          },
          {
            label: 'High',
            type: '$',
            value: val.high,
            colorMode: 'blue',
          },
          {
            label: 'Low',
            type: '$',
            value: val.low,
            colorMode: 'blue',
          },
          {
            label: 'Close',
            type: '$',
            value: val.close,
            colorMode: 'blue',
          },
        ]
        setChartHoverInfo(items)
      } else {
        clearChartHoverInfo()
      }
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      chart?.remove()
    }
  }, [data, visibleRange])
  return (
    <div className="h-full w-full overflow-auto" ref={chartContainerRef}></div>
  )
}

export default CandleChart
