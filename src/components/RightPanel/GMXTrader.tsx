import 'rc-slider/assets/index.css'

import { TabType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import { useState } from 'react'
import { HiArrowsRightLeft } from 'react-icons/hi2'
import { IoTrendingDownSharp, IoTrendingUpSharp } from 'react-icons/io5'

import Button from '../shared/Button'
import Select from '../shared/Form/Select'
import LeverageSlider from '../shared/LeverageSlider'
import TokenSwap from '../shared/Swap/TokenSwap'
import TokenSwapItem from '../shared/Swap/TokenSwapItem'
import Tabs from '../shared/Tabs'
import { useMarket } from '@/store/tokenStore'

const GMXTrader = () => {
  const market = useMarket()
  const [strategy, setStrategy] = useState<'long' | 'put' | 'swap'>('long')
  const [leverageOption, setLeverageOption] = useState<number | number[]>(1.1)
  const [exchangeType, setExchangeType] = useState<'market' | 'limit'>('market')
  const tabsLongShort: TabType[] = [
    {
      key: 0,
      label: 'Long',

      leftIcon: <IoTrendingUpSharp size="1.125rem" />,
      action: () => {
        setStrategy('long')
      },
    },
    {
      key: 1,
      label: 'Put',
      leftIcon: <IoTrendingDownSharp size="1.125rem" />,
      action: () => {
        setStrategy('put')
      },
    },
    {
      key: 2,
      label: 'Swap',
      leftIcon: <HiArrowsRightLeft size="1.125rem" />,
      action: () => {
        setStrategy('swap')
      },
    },
  ]

  const tabsExchangeType: TabType[] = [
    {
      key: 0,
      label: 'Market',
      action: () => setExchangeType('market'),
    },
    {
      key: 1,
      label: 'Limit',
      action: () => setExchangeType('limit'),
    },
  ]

  const infoItems: { key: number; label: string; value: string | number }[] = [
    //TODO: change values to real data
    { key: 0, label: 'Collateral in', value: 'USD' },
    {
      key: 1,
      label: 'Entry Price',
      value: formatNumber(123, { symbol: '$', decimalCases: 2 }),
    },
    {
      key: 2,
      label: 'Liq. Price',
      value: formatNumber(-1685, { symbol: '$', decimalCases: 2 }),
    },
    {
      key: 3,
      label: 'Fees',
      value: formatNumber(15.12, { symbol: '$', decimalCases: 2 }),
    },
  ]

  const extraInfoItems: {
    key: number
    label: string
    value: string | number
  }[] = [
    //TODO: change values to real data
    {
      key: 0,
      label: 'Entry Price',
      value: formatNumber(123, { symbol: '$', decimalCases: 2 }),
    },
    {
      key: 1,
      label: 'Exit Price',
      value: formatNumber(123, { symbol: '$', decimalCases: 2 }),
    },
    {
      key: 2,
      label: 'Borrow Fee',
      value: `${formatNumber(0.0000055, {
        symbol: '%',
        isSymbolEnd: true,
        decimalCases: 4,
      })} / 1h`,
    },
    {
      key: 3,
      label: 'Available Liquidity',
      value: formatNumber(2843643.15, { symbol: '$', decimalCases: 2 }),
    },
  ]

  const [limitPrice, setLimitPrice] = useState<number>()
  const tokens = [
    { label: 'ETH', value: 'ETH' },
    { label: 'USDC', value: 'USDC' },
    { label: 'USDT', value: 'USDT' },
    { label: 'BTC', value: 'BTC' },
  ]
  const [token, setToken] = useState<{
    label: string
    value: string
    quantity: number | undefined
  }>({ ...tokens[0]!, quantity: undefined })

  const getSubmitBtnLabel = () => {
    if (!token.quantity || token.quantity <= 0) return 'Enter an amount'

    return exchangeType === 'market' ? 'Enable Leverage' : 'Enable Orders'
  }
  return (
    <div className="flex w-full flex-col gap-3 rounded-l-lg rounded-br-lg border border-gray-500 bg-gray-600 p-5">
      <div className="flex flex-col gap-2">
        <Tabs tabList={tabsLongShort} style="normal" />
        <div className="flex w-min">
          <Tabs tabList={tabsExchangeType} style="no-style" size="sm" />
        </div>
      </div>
      {strategy !== 'swap' && (
        <>
          {exchangeType === 'limit' && (
            <TokenSwapItem
              label={'Price'}
              value={limitPrice}
              onValueChange={setLimitPrice}
              secondaryText={'Mark: 1,564.21'}
              tokenSelect={
                <span className="pr-2 text-sm font-normal text-gray-300">
                  USD
                </span>
              }
              placeholder="0.0"
            />
          )}
          <TokenSwapItem
            label={'Size'}
            value={token.quantity}
            placeholder="0.0"
            onValueChange={(qt) =>
              setToken((prev) => ({ ...prev, quantity: qt }))
            }
            tokenSelect={
              <Select
                items={tokens}
                selectedItem={token}
                setSelectedItem={(token: { label: string; value: string }) =>
                  setToken({
                    label: token.label,
                    value: token.value,
                    quantity: 0,
                  })
                }
                style="no-style"
              />
            }
            secondaryText={``}
          />

          <div className="flex flex-col gap-5 rounded bg-gray-500 p-3">
            {exchangeType === 'market' && (
              <div className="mb-4 flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <div className="text-xs font-normal text-gray-300">
                    Leverage slider
                  </div>
                  <div className="text-sm text-primary">{leverageOption}x</div>
                </div>
                <LeverageSlider
                  leverageOption={leverageOption}
                  setLeverageOption={setLeverageOption}
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              {infoItems.map((item) => (
                <div key={item.key} className="flex justify-between">
                  <div className="text-xs font-normal text-gray-300">
                    {item.label}
                  </div>
                  <div className="text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <Button label={getSubmitBtnLabel()} size="lg" />

          <div className="flex flex-col gap-2 rounded bg-gray-500 p-3">
            <div>
              {strategy.charAt(0).toUpperCase() + strategy.slice(1)}{' '}
              {market.label}
            </div>
            {extraInfoItems.map((item) => (
              <div key={item.key} className="flex justify-between">
                <div className="text-xs font-normal text-gray-300">
                  {item.label}
                </div>
                <div className="text-sm">{item.value}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {strategy === 'swap' && (
        <TokenSwap tokens={tokens} exchangeType={exchangeType} />
      )}
    </div>
  )
}

export default GMXTrader
