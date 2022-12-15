import useTokenIcon from '@/hooks/useTokenIcon.jsx'
import {
  useGraphVisibleRange,
  useToken,
  useTokenActions,
} from '@/store/tokenStore'
import { TokenInfoType } from '@/types/next.js'
import { getPercentage } from '@/utils/getPercentage'
import {
  ChartOptions,
  ColorType,
  createChart,
  DeepPartial,
  OhlcData,
} from 'lightweight-charts'
import { useEffect, useRef } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../../tailwind.config.cjs'

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
    timeVisible: false,
    secondsVisible: false,
    fixLeftEdge: true,
    fixRightEdge: true,
    borderVisible: false,
    barSpacing: 26,
  },
  rightPriceScale: {
    scaleMargins: {
      top: 0.1,
      bottom: 0.05,
    },
    entireTextOnly: true,
    borderVisible: false,
    drawTicks: false,
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

    const newSeries = chart?.addCandlestickSeries({
      upColor: '#24ca49',
      downColor: '#fd4438',
      wickUpColor: '#24ca49',
      wickDownColor: '#fd4438',
      borderVisible: false,
    })
    newSeries?.setData(data)

    visibleRange
      ? chart?.timeScale().setVisibleRange(visibleRange)
      : chart?.timeScale().fitContent()

    window.addEventListener('resizeChart', handleResize)

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
        ]
        setChartHoverInfo(items)
      } else {
        clearChartHoverInfo()
      }
    })

    return () => {
      window.removeEventListener('resizeChart', handleResize)
      chart?.remove()
    }
  }, [data, visibleRange])
  return (
    <div className="h-56 w-full overflow-auto" ref={chartContainerRef}></div>
  )
}

export default CandleChart
