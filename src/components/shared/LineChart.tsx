import { useTokenPrice } from '@/store/tokenStore'
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart as RLineChart,
  YAxis,
  ReferenceLine,
} from 'recharts'
import tailwindConfig from 'tailwind.config.cjs'
import resolveConfig from 'tailwindcss/resolveConfig'

type LineChartProps = {
  data: { tokenPrice: number; payoff: number }[]
  isHover: boolean
  setIsHover: (flag: boolean) => void
  renderTooltip: (payload?: {
    tokenPrice: number
    payoff: number
  }) => React.ReactNode
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  renderTooltip,
  isHover,
  setIsHover,
}) => {
  const tw = resolveConfig(tailwindConfig)
  const tokenPrice = useTokenPrice()
  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.payoff))
    const dataMin = Math.min(...data.map((i) => i.payoff))

    if (dataMax <= 0) {
      return 0
    }
    if (dataMin >= 0) {
      return 1
    }

    return dataMax / (dataMax - dataMin)
  }
  const off = gradientOffset()
  return (
    <ResponsiveContainer width="100%" height={100}>
      <RLineChart
        data={data}
        margin={{ top: 5, right: 5, left: 10, bottom: 5 }}
        onMouseMove={() => {
          setIsHover(true)
        }}
        onMouseLeave={() => {
          setIsHover(false)
        }}
      >
        <ReferenceLine
          x={tokenPrice}
          stroke={
            !isHover && tokenPrice ? '#606571' : tw.theme.colors.gray[500]
          }
          strokeWidth={2}
        />
        <ReferenceLine y={0} stroke="white" strokeWidth={1} />
        <XAxis
          dataKey="tokenPrice"
          type="number"
          domain={['dataMin', 'dataMax']}
          hide={true}
        />
        <YAxis
          dataKey={'payoff'}
          type="number"
          domain={['dataMin', 'dataMax']}
          hide={true}
        />
        <Tooltip
          cursor={{ visibility: 'default', stroke: '#606571', strokeWidth: 2 }}
          // active={true}
          // allowEscapeViewBox={{ x: true, y: true }}
          // wrapperStyle={{ visibility: 'visible' }} // this is required
          isAnimationActive={false}
          // offset={0}
          content={(prop) => {
            if (prop.payload && prop.payload.length) {
              return renderTooltip(prop.payload[0]?.payload)
            }
          }}
          position={{ y: 0 }}
        />
        <defs>
          <linearGradient id="payoffColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor={tw.theme.colors.green[400]} />
            <stop offset={off} stopColor={tw.theme.colors.red[400]} />
          </linearGradient>
        </defs>
        <Line
          type="linear"
          dataKey="payoff"
          stroke="url(#payoffColor)"
          strokeWidth={4}
          dot={false}
          activeDot={{ fill: tw.theme.colors.white }}
        />
      </RLineChart>
    </ResponsiveContainer>
  )
}

export default LineChart
