import Tabs from '@/components/shared/Tabs'
import { PositionType, TabType } from '@/types/next'
import { BigNumber } from 'ethers'
import { useState } from 'react'

import LINKIcon from '@/Icons/tokens/link'
import Switch from '@/components/shared/Form/Switch'
import OpenPositionsTable from '../OpenPositionsTable'
import { Market } from '@/types/next'

const TokenPositionsPanel = () => {
  const [isOpen, setIsOpen] = useState(true)
  const openClosedTabs: TabType[] = [
    {
      key: 0,
      label: 'Open',
      action: () => {
        setIsOpen(true)
      },
    },
    {
      key: 1,
      label: 'Closed',
      action: () => {
        setIsOpen(false)
      },
    },
  ]
  const [tableType, setTableType] = useState<'positions' | 'orders'>(
    'positions'
  )

  const tableTypeTabs: TabType[] = [
    {
      key: 0,
      label: 'Positions',
      action: () => {
        setTableType('positions')
      },
    },
    {
      key: 1,
      label: 'Orders',
      action: () => {
        setTableType('orders')
      },
    },
  ]

  const ethToken: Market = {
    value: 'ETHUSDT',
    label: 'ETH',
  }
  const dummyPositions: PositionType[] = [
    {
      id: 123456,
      isOpen: true,
      token: ethToken,
      operation: 'Call',
      strategy: 'Long',
      strike: 1800,
      expiryTime: 1654321010,
      value: 3500,
      size: 10,
      pnl: 100,
      unrealisedPnl: 50,
      costPerOption: 5,
      price: 10,
      collateral: 15000,
      entryPrice: 8,
      markPrice: 9,
      liqPrice: 7,
      profit: 200,
      impliedVolatility: 0.3,
      delta: 0.7,
      vega: 0.1,
      gamma: 0.05,
      theta: 0.02,
      openInterest: 100,
      openDate: new Date('2023-05-01T09:30:00Z'),
    },
  ]

  const [isChainlinkPrice, setIsChainlinkPrice] = useState(false)
  return (
    <div className="flex w-full flex-col items-center gap-5 rounded-lg border border-gray-500 bg-gray-600 py-5 pr-5">
      <div className="flex w-full items-center justify-between">
        <div>
          <Tabs tabList={tableTypeTabs} style="no-style" size="lg" />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Switch
              enabled={isChainlinkPrice}
              setEnabled={setIsChainlinkPrice}
              size="sm"
            />
            <div className="flex items-center gap-1 text-sm">
              <LINKIcon size={15} /> Price
            </div>
          </div>
          <Tabs tabList={openClosedTabs} style="b&w" size="sm" />
        </div>
      </div>
      <OpenPositionsTable data={dummyPositions} />
    </div>
  )
}

export default TokenPositionsPanel
