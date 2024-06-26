import { useTokenActions } from '@/store/tokenStore'
import { TokenInfoType } from '@/types/next'
import {
  AreaData,
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
      type: 'area'
      initialData: AreaData[]
    }
  | {
      type: 'volume'
      initialData: HistogramData[]
    }
  | {
      type: 'pnlUp'
      initialData: AreaData[]
    }
  | {
      type: 'pnlDown'
      initialData: AreaData[]
    }

const Series = forwardRef<
  ISeriesApi<'Candlestick' | 'Histogram' | 'Area'>,
  SeriesProps
>(({ type, initialData }, ref) => {
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
        switch (type) {
          case 'area':
            this.series = parent.api().addAreaSeries({
              lineColor: theme.colors.primary,

              topColor: 'rgba(255, 217, 83, 0.2)',
              bottomColor: 'rgba(255, 217, 83, 0)',
            })
            this.series.priceScale().applyOptions({
              scaleMargins: {
                top: 0.3, // highest point of the series will be 70% away from the top
                bottom: 0.2,
              },
            })

            break
          case 'pnlUp':
            this.series = parent.api().addAreaSeries({
              lastValueVisible: false, // hide the last value marker for this series
              crosshairMarkerVisible: false, // hide the crosshair marker for this series
              lineColor: 'transparent', // hide the line
              topColor: 'rgba(93, 199, 135, 0)',
              bottomColor: 'rgba(93, 199, 135, 0.15)',
              invertFilledArea: true,
            })
            break
          case 'pnlDown':
            this.series = parent.api().addAreaSeries({
              lastValueVisible: false, // hide the last value marker for this series
              crosshairMarkerVisible: false, // hide the crosshair marker for this series
              lineColor: 'transparent', // hide the line
              topColor: 'rgba(227, 85, 97, 0.15)',
              bottomColor: 'rgba(227, 85, 97, 0)',
            })
            break
          case 'candles':
            this.series = parent.api().addCandlestickSeries({
              upColor: theme.colors.green[400],
              downColor: theme.colors.red[400],
              wickUpColor: theme.colors.green[400],
              wickDownColor: theme.colors.red[400],
              borderVisible: false,
            })
            this.series.priceScale().applyOptions({
              scaleMargins: {
                top: 0.3, // highest point of the series will be 70% away from the top
                bottom: 0.2,
              },
            })
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
            break

          case 'volume':
            this.series = parent.api().addHistogramSeries({
              priceFormat: {
                type: 'volume',
              },
              priceScaleId: '', // set as an overlay by setting a blank priceScaleId
              // set the positioning of the volume series
            })
            this.series.priceScale().applyOptions({
              scaleMargins: {
                top: 0.9, // highest point of the series will be 70% away from the top
                bottom: 0,
              },
            })
            break
        }

        this.series.setData(initialData)
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
})

Series.displayName = 'Series'
export default Series
