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
import { useToken } from '@/store/tokenStore'
import clsx from 'clsx'

type LineChartProps = {
  data: { tokenPrice: number; payoff: number }[]
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  // const fullConfig = resolveConfig(tailwindConfig)
  const token = useToken()
  console.log(data)

  const renderTooltip = (payload: { tokenPrice: number; payoff: number }) => {
    return (
      <div className=" ml-[-100%] flex flex-col items-center text-xs text-text-purple">
        <p>
          {token.symbol} Price at Exp{' '}
          {formatNumber(payload.tokenPrice, { decimalCases: 2, symbol: '$' })}
        </p>
        <p>
          Payoff{' '}
          <span
            className={clsx({
              'text-green': payload.payoff > 0,
              'text-red': payload.payoff < 0,
            })}
          >
            {formatNumber(payload.payoff, { decimalCases: 2, symbol: '$' })}
          </span>
        </p>
      </div>
    )
  }

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
