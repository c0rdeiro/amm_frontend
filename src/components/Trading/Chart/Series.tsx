import { useTokenActions } from '@/store/tokenStore'
import { TokenInfoType } from '@/types/next'
import {
  BarData,
  HistogramData,
  ISeriesApi,
  MouseEventParams,
  OhlcData,
} from 'lightweight-charts'
import {
  forwardRef,
  useContext,
  useLayoutEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { ChartContext } from './ChartContainer'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind.config.cjs'

type SeriesProps =
  | {
      type: 'candles'
      initialData: OhlcData[]
    }
  | {
      type: 'volume'
      initialData: HistogramData[]
    }

const Series = forwardRef<ISeriesApi<'Candlestick' | 'Histogram'>, SeriesProps>(
  ({ type, initialData }, ref) => {
    const { setChartHoverInfo, clearChartHoverInfo } = useTokenActions()
    const { theme } = resolveConfig(tailwindConfig)

    const parent = useContext(ChartContext)
    const context = useRef<{
      api: () => any
      free: () => void
      series: any
    }>({
      series: undefined,
      api() {
        if (!this.series) {
          this.series =
            type === 'candles'
              ? parent.api().addCandlestickSeries({
                  upColor: theme.colors.green[400],
                  downColor: theme.colors.red[400],
                  wickUpColor: theme.colors.green[400],
                  wickDownColor: theme.colors.red[400],
                  borderVisible: false,
                })
              : parent.api().addHistogramSeries({
                  priceFormat: {
                    type: 'volume',
                  },
                  priceScaleId: '', // set as an overlay by setting a blank priceScaleId
                  // set the positioning of the volume series
                })
          this.series.setData(initialData)
          if (type === 'candles') {
            parent.chart.subscribeCrosshairMove((param: MouseEventParams) => {
              if (this.series && param.seriesData.get(this.series)) {
                const val = param.seriesData.get(this.series) as BarData
                const items: TokenInfoType[] = [
                  {
                    label: 'Change',
                    type: '%',
                    value: (val.close - val.open) / val.open,
                    colorMode: 'redgreen',
                  },
                  {
                    label: 'Open',
                    type: '$',
                    value: val.open,
                  },
                  {
                    label: 'High',
                    type: '$',
                    value: val.high,
                  },
                  {
                    label: 'Low',
                    type: '$',
                    value: val.low,
                  },
                  {
                    label: 'Close',
                    type: '$',
                    value: val.close,
                  },
                ]
                setChartHoverInfo(items)
              } else {
                clearChartHoverInfo()
              }
            })
          } else {
            this.series.priceScale().applyOptions({
              scaleMargins: {
                top: 0.9, // highest point of the series will be 70% away from the top
                bottom: 0,
              },
            })
          }
        }
        return this.series
      },
      free() {
        if (this.series && type === 'candles') {
          parent.free()
        }
      },
    })

    useLayoutEffect(() => {
      const currentRef = context.current
      currentRef.api()

      return () => currentRef.free()
    }, [])

    useImperativeHandle(ref, () => context.current.api(), [])

    return (
      <></>
      // <ChartContext.Provider value={context.current}></ChartContext.Provider>
    )
  }
)

Series.displayName = 'Series'
export default Series
