import { TabType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import Slider from 'rc-slider'
import { useContext, useState } from 'react'
import { IoTrendingUpSharp, IoTrendingDownSharp } from 'react-icons/io5'
import Button from '../shared/Button'
import Select from '../shared/Form/Select'
import TokenSwapItem from '../shared/Swap/TokenSwapItem'
import Tabs from '../shared/Tabs'
import 'rc-slider/assets/index.css'
import { ThemeContext } from '@/providers/ThemeProvider'
import LeverageSlider from '../shared/LeverageSlider'

const GMXTrader = () => {
  const [isLong, setIsLong] = useState<boolean>(true)
  const [leverageOption, setLeverageOption] = useState<number | number[]>(1.1)
  const [exchangeType, setExchangeType] = useState<
    'market' | 'limit' | 'trigger'
  >('market')
  const tabsLongShort: TabType[] = [
    {
      key: 0,
      label: 'Long',

      icon: <IoTrendingUpSharp size="1.125rem" />,
      action: () => {
        setIsLong(true)
      },
    },
    {
      key: 1,
      label: 'Short',
      icon: <IoTrendingDownSharp size="1.125rem" />,
      action: () => {
        setIsLong(false)
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
    {
      key: 2,
      label: 'Trigger',
      action: () => setExchangeType('trigger'),
    },
  ]

  const infoItems: { label: string; value: string | number }[] = [
    //TODO: change values to real data
    { label: 'Collateral in', value: 'USD' },
    { label: 'Leverage', value: `${leverageOption}x` },
    {
      label: 'Entry Price',
      value: formatNumber(123, { symbol: '$', decimalCases: 2 }),
    },
    {
      label: 'Liq. Price',
      value: formatNumber(-1685, { symbol: '$', decimalCases: 2 }),
    },
    {
      label: 'Fees',
      value: formatNumber(15.12, { symbol: '$', decimalCases: 2 }),
    },
  ]
  const [limitPrice, setLimitPrice] = useState<number>(0)
  const tokens = [
    { label: 'USDC', value: 'USDC' },
    { label: 'USDT', value: 'USDT' },
    { label: 'ETH', value: 'ETH' },
    { label: 'BTC', value: 'BTC' },
  ]
  const [token, setToken] = useState<{
    label: string
    value: string
    quantity: number
  }>({ quantity: 0, ...tokens[0]! })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Tabs tabList={tabsLongShort} style="monochromatic" />
        <div className="flex w-min">
          <Tabs tabList={tabsExchangeType} style="no-style" size="sm" />
        </div>
        {exchangeType !== 'trigger' && (
          <TokenSwapItem
            label={'Pay'}
            value={token.quantity}
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
            secondaryText={`Balance 0.000`}
          />
        )}
        {exchangeType === 'limit' && (
          <TokenSwapItem
            label={'Price'}
            value={limitPrice}
            onValueChange={setLimitPrice}
            secondaryText={'Mark: 1,564.21'}
            tokenSelect={<span>USD</span>}
          />
        )}
      </div>
      <div className="mb-4 flex flex-col gap-2 pb-8 text-sm">
        <div>Leverage slider</div>
        <LeverageSlider
          leverageOption={leverageOption}
          setLeverageOption={setLeverageOption}
        />
      </div>
      <div className="flex flex-col gap-2">
        {infoItems.map((item, key) => (
          <div key={key} className="flex justify-between">
            <div>{item.label}</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>
      <Button label={'Trade'} size="lg" />
    </div>
  )
}

export default GMXTrader
