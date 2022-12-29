import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart as Chart,
  YAxis,
  ReferenceLine,
} from 'recharts'
import formatNumber from '@/utils/formatNumber'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config.cjs'
import clsx from 'clsx'

type LineChartProps = {
  data: { tokenPrice: number; payoff: number }[]
  renderTooltip: (payload: {
    tokenPrice: number
    payoff: number
  }) => React.ReactNode
}

const LineChart: React.FC<LineChartProps> = ({ data, renderTooltip }) => {
  // const fullConfig = resolveConfig(tailwindConfig)

  return (
    <ResponsiveContainer width="100%" height={100}>
      <Chart data={data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
        <ReferenceLine y={0} stroke="#9A9AAF" strokeWidth={2} />
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
          allowEscapeViewBox={{ x: true, y: true }}
          wrapperStyle={{ visibility: 'visible' }} // this is required
          isAnimationActive={false}
          // offset={0}
          content={(prop) => {
            if (prop.payload && prop.payload.length) {
              return renderTooltip(prop.payload[0]?.payload)
            }

            return null
          }}
          // position={{ y: -25 }}
        />

        <Line type="linear" dataKey="payoff" stroke="#24ca49" dot={false} />
      </Chart>
    </ResponsiveContainer>
  )
}

export default LineChart
