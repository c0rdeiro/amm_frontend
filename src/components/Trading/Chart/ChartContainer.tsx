import {
  ChartOptions,
  ColorType,
  createChart,
  DeepPartial,
} from 'lightweight-charts'
import {
  createContext,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react'

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

    return (
      <ChartContext.Provider value={chartApiRef.current}>
        {children}
      </ChartContext.Provider>
    )
  }
)

ChartContainer.displayName = 'CharContainer'
export default ChartContainer
