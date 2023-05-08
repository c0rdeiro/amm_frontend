import { useChartVisibleRange } from '@/store/tokenStore'
import {
  ChartOptions,
  ColorType,
  createChart,
  DeepPartial,
} from 'lightweight-charts'
import {
  createContext,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react'
import tailwindConfig from 'tailwind.config.cjs'
import resolveConfig from 'tailwindcss/resolveConfig'

const STATIC_CHART_OPTIONS: DeepPartial<ChartOptions> = {
  grid: {
    vertLines: {
      color: '#1F2227',
    },
    horzLines: {
      color: '#1F2227',
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
      top: 0.25,
      bottom: 0.2,
    },
    entireTextOnly: true,
    borderVisible: false,
    // drawTicks: false,
  },
}

export const ChartContext = createContext<{
  api: () => any
  free: () => void
  chart: any
}>({ chart: undefined, api: () => {}, free: () => {} }) // eslint-disable-line  @typescript-eslint/no-empty-function

type ChartContainerProps = {
  children: React.ReactNode
  container: any
}

const ChartContainer = forwardRef<any, ChartContainerProps>(
  ({ children, container }, ref) => {
    const { theme } = resolveConfig(tailwindConfig)
    const visibleRange = useChartVisibleRange()
    const chartApiRef = useRef<{
      api: () => any
      free: () => void
      chart: any
    }>({
      chart: undefined,
      api(): any {
        if (!this.chart) {
          this.chart = createChart(container, {
            width: container.clientWidth,
            layout: {
              background: {
                type: ColorType.Solid,
                color: 'transparent',
              },
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              textColor: theme.colors.gray[300],
            },
            crosshair: {
              mode: 0,
              vertLine: {
                color: theme.colors.white,
                style: 2,
                width: 1,
              },
              horzLine: {
                color: theme.colors.white,
                labelBackgroundColor: theme.colors.white,
                style: 2,
                width: 1,
              },
            },

            ...STATIC_CHART_OPTIONS,
          })
          this.chart.timeScale().fitContent()
        }
        return this.chart
      },
      free() {
        if (this.chart) {
          this.chart.remove()
        }
      },
    })

    useLayoutEffect(() => {
      const currentRef = chartApiRef.current
      const chart = currentRef.api()

      const handleResize = () => {
        chart.applyOptions({
          width: container.clientWidth,
        })
      }

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])
    useLayoutEffect(() => {
      const currentRef = chartApiRef.current
      currentRef.api()
    }, [])

    useImperativeHandle(ref, () => chartApiRef.current.api(), [])

    useEffect(() => {
      if (visibleRange) {
        const chart = chartApiRef.current.api()
        chart.timeScale().setVisibleRange(visibleRange)
      }
    }, [visibleRange])

    return (
      <ChartContext.Provider value={chartApiRef.current}>
        {children}
      </ChartContext.Provider>
    )
  }
)

ChartContainer.displayName = 'CharContainer'
export default ChartContainer
