import LineChart from '@/components/shared/LineChart'
import { useMarket, useTokenPrice } from '@/store/tokenStore'
import formatNumber from '@/utils/formatNumber'
import { useState } from 'react'

type IVXLineChartWrapperProps = {
  data: { tokenPrice: number; payoff: number }[]
}
const IVXLineChartWrapper: React.FC<IVXLineChartWrapperProps> = ({ data }) => {
  const market = useMarket()
  const tokenPrice = useTokenPrice()
  const [isHover, setisHover] = useState(false)

  const renderChartTooltip = (payload?: {
    tokenPrice: number
    payoff: number
  }) => {
    if (tokenPrice)
      return (
        <div className="flex items-center justify-center rounded bg-gray-400 py-1 px-2 text-xs font-normal text-white">
          <p>
            {market.label} Price {payload ? `at Exp` : 'Now'}
            {formatNumber(payload ? payload.tokenPrice : tokenPrice, {
              decimalCases: 2,
              symbol: '$',
            })}
          </p>
        </div>
      )

    return null
  }

  return (
    <div className="relative">
      <LineChart
        data={data}
        renderTooltip={renderChartTooltip}
        isHover={isHover}
        setIsHover={setisHover}
      />
      {tokenPrice && !isHover && (
        <div className="absolute right-14 top-0 flex items-center justify-center rounded bg-gray-400 py-1 px-2 text-xs font-normal text-white">
          <p>
            {market.label} Price Now
            {formatNumber(tokenPrice, {
              decimalCases: 2,
              symbol: '$',
            })}
          </p>
        </div>
      )}
    </div>
  )
}
export default IVXLineChartWrapper
