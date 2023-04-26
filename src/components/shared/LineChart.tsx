import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart as Chart,
  YAxis,
  ReferenceLine,
} from 'recharts'
import tailwindConfig from 'tailwind.config.cjs'
import resolveConfig from 'tailwindcss/resolveConfig'

type LineChartProps = {
  data: { tokenPrice: number; payoff: number }[]
  renderTooltip: (payload: {
    tokenPrice: number
    payoff: number
  }) => React.ReactNode
  currentPrice: number
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  renderTooltip,
  currentPrice,
}) => {
  const tw = resolveConfig(tailwindConfig)

  return (
    <ResponsiveContainer width="100%" height={100}>
      <Chart data={data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
        <ReferenceLine y={currentPrice} stroke="#9A9AAF" strokeWidth={2} />
        <XAxis
          dataKey="tokenPrice"
          type="number"
          domain={['dataMin', 'dataMax']}
          hide={true}
        />
        <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
        <Tooltip
          // cursor={{ visibility: 'default', stroke: '#9A9AAF' }}
          cursor={false}
          active={true}
          // allowEscapeViewBox={{ x: true, y: true }}
          wrapperStyle={{ visibility: 'visible' }} // this is required
          isAnimationActive={false}
          // offset={0}
          content={(prop) => {
            if (prop.payload && prop.payload.length) {
              return renderTooltip(prop.payload[0]?.payload)
            }

            return null
          }}
          // position={{ y: 0 }}
        />

        <Line
          type="linear"
          dataKey="payoff"
          stroke={tw.theme.colors.primary}
          dot={false}
          activeDot={{ fill: tw.theme.colors.white }}
        />
      </Chart>
    </ResponsiveContainer>
  )
}

export default LineChart
