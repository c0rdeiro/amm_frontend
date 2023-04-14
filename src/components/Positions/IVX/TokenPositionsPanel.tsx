import Tabs from '@/components/shared/Tabs'
import { TabType } from '@/types/next'
import { BigNumber } from 'ethers'
import { useState } from 'react'

import GMXPositionsTable from '../GMXPositionsTable'
import PositionsCompactTable from './PositionsCompactTable'

const TokenPositionsPanel = () => {
  const tableTabs: TabType[] = [
    {
      key: 0,
      label: 'Open (0)',
      action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    },
    {
      key: 1,
      label: 'Closed',
      action: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    },
  ]

  const [currentTab, setCurrentTab] = useState<'IVX' | 'GMX'>('GMX')

  const ethToken: GMXToken = {
    name: 'Eth',
    symbol: 'ETH',
    decimals: 18,
    address: '0x0000000000000000000000000000000000000000',
  }

  const dummyPositions: GMXPosition[] = [
    {
      key: 'position1',
      contractKey: 'contract1',
      collateralToken: ethToken,
      indexToken: ethToken,
      isLong: true,
      size: BigNumber.from(50),
      collateral: BigNumber.from(1),
      averagePrice: BigNumber.from(1),
      entryFundingRate: BigNumber.from(1),
      cumulativeFundingRate: BigNumber.from(1),
      hasRealisedProfit: true,
      realisedPnl: BigNumber.from(1),
      lastIncreasedTime: 1649798400000,
      hasProfit: false,
      delta: BigNumber.from(1),
      markPrice: BigNumber.from(1),
      fundingFee: BigNumber.from(1),
      collateralAfterFee: BigNumber.from(1),
      closingFee: BigNumber.from(1),
      positionFee: BigNumber.from(1),
      totalFees: BigNumber.from(1),
      pendingDelta: BigNumber.from(1),
      hasLowCollateral: false,
      deltaPercentage: BigNumber.from(-1),
      deltaStr: '-$1',
      deltaPercentageStr: '-1%',
      deltaBeforeFeesStr: '1',
      hasProfitAfterFees: true,
      pendingDeltaAfterFees: BigNumber.from(1),
      deltaPercentageAfterFees: BigNumber.from(1),
      deltaAfterFeesStr: '0.5 DT',
      deltaAfterFeesPercentageStr: '5%',
      netValue: BigNumber.from(1),
      leverage: BigNumber.from(1),
      leverageStr: '1.10x',
      entryPrice: BigNumber.from(1),
      liqPrice: BigNumber.from(1),
    },
    {
      key: 'position2',
      collateralToken: ethToken,
      indexToken: ethToken,
      isLong: false,
      size: BigNumber.from(1),
      collateral: BigNumber.from(1),
      averagePrice: BigNumber.from(1),
      entryFundingRate: BigNumber.from(1),
      cumulativeFundingRate: BigNumber.from(1),
      hasRealisedProfit: false,
      realisedPnl: BigNumber.from(1),
      lastIncreasedTime: 1649798400000,
      hasProfit: true,
      delta: BigNumber.from(1),
      markPrice: BigNumber.from(1),
      fundingFee: BigNumber.from(1),
      collateralAfterFee: BigNumber.from(1),
      closingFee: BigNumber.from(1),
      positionFee: BigNumber.from(1),
      totalFees: BigNumber.from(1),
      pendingDelta: BigNumber.from(1),
      hasLowCollateral: false,
      deltaPercentage: BigNumber.from(1),
      deltaStr: '$1',
      deltaPercentageStr: '1%',
      deltaBeforeFeesStr: '1',
      hasProfitAfterFees: true,
      pendingDeltaAfterFees: BigNumber.from(1),
      deltaPercentageAfterFees: BigNumber.from(1),
      deltaAfterFeesStr: '0.5 DT',
      deltaAfterFeesPercentageStr: '5%',
      netValue: BigNumber.from(1),
      leverage: BigNumber.from(1),
      leverageStr: '1.10x',
      entryPrice: BigNumber.from(1),
      liqPrice: BigNumber.from(1),
    },
  ]

  const getCurrentTable = () => {
    switch (currentTab) {
      case 'GMX':
        return <GMXPositionsTable data={dummyPositions} />
      case 'IVX':
      default:
        return <PositionsCompactTable data={[]} />
    }
  }

  return (
    <div className="flex w-full items-start gap-8 overflow-y-auto pb-14">
      <div className="flex w-full flex-col items-start rounded-lg py-2 px-6 ">
        <div className="flex w-64 items-center  pb-4 ">
          <Tabs tabList={tableTabs} size="sm" style="monochromatic" />
        </div>

        {getCurrentTable()}
      </div>
    </div>
  )
}

export default TokenPositionsPanel
