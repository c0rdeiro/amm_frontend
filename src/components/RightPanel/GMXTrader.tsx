import { TabType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import { useState } from 'react'
import { IoTrendingUpSharp, IoTrendingDownSharp } from 'react-icons/io5'
import Button from '../shared/Button'
import TokenSwap from '../shared/Swap/TokenSwap'
import TokenSwapItem from '../shared/Swap/TokenSwapItem'
import Tabs from '../shared/Tabs'

const GMXTrader = () => {
  const [isLong, setIsLong] = useState<boolean>(true)
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
    { label: 'Leverage', value: '0.06x' },
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Tabs tabList={tabsLongShort} style="monochromatic" />
        <div className="flex w-min">
          <Tabs tabList={tabsExchangeType} style="no-style" size="sm" />
        </div>
        <TokenSwap isLong={isLong} />
        {exchangeType === 'limit' && (
          <TokenSwapItem
            label={'Price'}
            value={0}
            secondaryText={'Mark: 1,564.21'}
            tokenSelect={<span>USD</span>}
          />
        )}
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
