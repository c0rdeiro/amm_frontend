import LineChart from '@/components/shared/LineChart'
import { useMarket, useTokenPrice } from '@/store/tokenStore'
import formatNumber from '@/utils/formatNumber'
import { calcPayoff } from '@/utils/optionsHelpers'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type IVXLineChartWrapperProps = {
  data: { tokenPrice: number; payoff: number }[]
  strike: number
  premium: number
  isCall: boolean
  isBuy: boolean
  numContracts: number
}
const IVXLineChartWrapper: React.FC<IVXLineChartWrapperProps> = ({
  data,
  strike,
  premium,
  isCall,
  isBuy,
  numContracts,
}) => {
  const market = useMarket()
  const tokenPrice = useTokenPrice()
  const [isHover, setisHover] = useState(false)
  const [epnl, setEpnl] = useState(0)

  useEffect(() => {
    if (tokenPrice && !isHover) {
      setEpnl(
        calcPayoff(tokenPrice, strike, premium, isCall, isBuy, numContracts)
      )
    }
  }, [tokenPrice, isHover, strike, premium, isCall, isBuy, numContracts])

  const renderChartTooltip = (payload?: {
    tokenPrice: number
    payoff: number
  }) => {
    if (payload) setEpnl(payload.payoff)

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
    <div className="flex h-auto w-full flex-col gap-2 rounded bg-gray-500 p-3 md:h-44 lg:h-44">
      <div className="flex justify-between text-xs font-normal text-gray-300">
        <div>Expected Profit / Loss</div>
        <div
          className={clsx('text-sm font-normal', {
            'text-green-400': epnl > 0,
            'text-red-400': epnl < 0,
          })}
        >
          {formatNumber(epnl, {
            decimalCases: 2,
            displayPositive: true,
            symbol: '$',
          })}
        </div>
      </div>
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
    </div>
  )
}
export default IVXLineChartWrapper
