import Switch from '@/components/shared/Form/Switch'
import Tabs from '@/components/shared/Tabs'
import LINKIcon from '@/Icons/tokens/link'
import { Order, TabType } from '@/types/next'
import { useState } from 'react'
import { parseEther } from 'viem'

import OrdersTable from './OrdersTable'
import PositionsTable from './PositionsTable'

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

  const ethToken: GMXToken = {
    name: 'Ethereum',
    symbol: 'ETH',
  }

  const dummyIVXPosition: IVXPositionType = {
    id: 1,
    token: ethToken,
    operation: 'Call',
    strategy: 'Long',
    strike: parseEther('200'),
    expiryTime: 1679827200,
    premium: parseEther('50'),
    size: parseEther('10'),
    pnl: parseEther('100'),
    unrealisedPnl: parseEther('200'),
    totalFees: parseEther('20'),
    markPrice: parseEther('250'),
    entryPrice: parseEther('220'),
    liqPrice: parseEther('180'),
    collateral: parseEther('1000'),
    collateralToken: ethToken,
    openTimestamp: 1621463721,
    isClosed: false,
    closeTimestamp: undefined,
    closePrice: undefined,
    costPerOption: 10,
    price: 20,
    breakeven: parseEther('15'),
    profit: 200,
    leverage: parseEther('5'),
    leverageStr: '5x',
  }

  const dummyGMXPosition: GMXPosition = {
    id: 2,
    token: ethToken,
    operation: 'Put',
    strategy: 'Short',
    strike: parseEther('150'),
    expiryTime: 1679827200,
    premium: parseEther('30'),
    size: parseEther('5'),
    pnl: parseEther('-50'),
    unrealisedPnl: parseEther('-100'),
    totalFees: parseEther('10'),
    markPrice: parseEther('120'),
    entryPrice: parseEther('110'),
    liqPrice: parseEther('160'),
    collateral: parseEther('800'),
    collateralToken: ethToken,
    openTimestamp: 1621463721,
    isClosed: true,
    closeTimestamp: 1621463721,
    closePrice: parseEther('100'),
    contractKey: 'GMXContract',
    averagePrice: parseEther('100'),
    entryFundingRate: parseEther('0.05'),
    cumulativeFundingRate: parseEther('0.1'),
    hasRealisedProfit: true,
    lastIncreasedTime: 1621463721,
    hasProfit: true,
    delta: parseEther('0.02'),
    fundingFee: parseEther('10'),
    collateralAfterFee: parseEther('1000'),
    closingFee: parseEther('5'),
    positionFee: parseEther('2'),
    pendingDelta: parseEther('0.01'),
    hasLowCollateral: false,
    deltaPercentage: parseEther('2'),
    deltaStr: '0.02',
    deltaPercentageStr: '2%',
    deltaBeforeFeesStr: '0.03',
    hasProfitAfterFees: true,
    pendingDeltaAfterFees: parseEther('0.005'),
    deltaPercentageAfterFees: parseEther('1'),
    deltaAfterFeesStr: '0.015',
    deltaAfterFeesPercentageStr: '1.5%',
    netValue: parseEther('1500'),
    leverage: parseEther('5'),
    leverageStr: '5x',
  }

  // Array of dummy (IVXPositionType | GMXPosition)
  const dummyPositions: (IVXPositionType | GMXPosition)[] = [
    dummyIVXPosition,
    dummyGMXPosition,
  ]

  const dummyOrders: Order[] = [
    {
      id: 0,
      token: ethToken,
      strategy: 'Long',
      n: 1600,
      type: 'Market',
      price: 1870,
      priceAbove: false,
      markPrice: 1875,
    },
  ]

  const [isChainlinkPrice, setIsChainlinkPrice] = useState(false)

  const getSelectedTable = () => {
    return tableType === 'positions' ? (
      <PositionsTable data={dummyPositions} isOpen={isOpen} />
    ) : (
      <OrdersTable data={dummyOrders} />
    )
  }
  return (
    <div className="mx-3 flex w-full flex-col items-center gap-5 overflow-x-auto rounded-lg border border-gray-500 bg-gray-600 py-5 pr-5 md:mx-0">
      <div className="flex w-full flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <Tabs tabList={tableTypeTabs} style="no-style" size="lg" />
        </div>
        <div className="ml-5 flex flex-row-reverse items-center gap-5 md:flex-row">
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
          {tableType === 'positions' && (
            <Tabs tabList={openClosedTabs} style="b&w" size="sm" />
          )}
        </div>
      </div>

      <div className="w-full overflow-auto">{getSelectedTable()}</div>
    </div>
  )
}

export default TokenPositionsPanel
