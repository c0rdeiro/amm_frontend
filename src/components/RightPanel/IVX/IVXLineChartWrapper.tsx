import LineChart from '@/components/shared/LineChart'
import { useMarket, useTokenPrice } from '@/store/tokenStore'
import formatNumber from '@/utils/formatNumber'

type IVXLineChartWrapperProps = {
  data: { tokenPrice: number; payoff: number }[]
  currentPrice: number
}
const IVXLineChartWrapper: React.FC<IVXLineChartWrapperProps> = ({
  data,
  currentPrice,
}) => {
  const market = useMarket()
  const renderChartTooltip = (payload: {
    tokenPrice: number
    payoff: number
  }) => {
    return (
      <div className="flex items-center justify-center rounded bg-gray-400 py-1 px-2 text-xs font-normal text-white">
        <p>
          {market.label} Price at Exp{' '}
          {formatNumber(payload.tokenPrice, { decimalCases: 2, symbol: '$' })}
        </p>
      </div>
    )
  }

  return (
    <LineChart
      data={data}
      renderTooltip={renderChartTooltip}
      currentPrice={currentPrice}
    />
  )
}
export default IVXLineChartWrapper
