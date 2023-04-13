import { TabType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

import Button from '../shared/Button'
import Modal from '../shared/Modal'
import TokenSwapItem from '../shared/Swap/TokenSwapItem'
import Tabs from '../shared/Tabs'

type GMXPositionCollateralModalProps = {
  position: GMXPosition
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
const GMXPositionCollateralModal: React.FC<GMXPositionCollateralModalProps> = ({
  position,
  isOpen,
  setIsOpen,
}) => {
  const [exchangeType, setExchangeType] = useState<number>(0) //these are numbers to manual control tabs; 0- market 1- trigger

  const tabsExchangeType: TabType[] = [
    {
      key: 0,
      label: 'Deposit',
      action: () => setExchangeType(0),
    },
    {
      key: 1,
      label: 'Withdraw',
      action: () => setExchangeType(1),
    },
  ]

  const [quantity, setQuantity] = useState(0)
  const [fees, setfees] = useState(0.16)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex w-96 flex-col items-center justify-center gap-4 self-center bg-sectionsBGDark font-medium text-white">
        <div className="flex w-full items-center justify-between px-4 pt-4">
          <span>{`Edit ${position.isLong ? 'Long' : 'Short'} ${
            position.indexToken.symbol
          }`}</span>
          <RxCross2
            onClick={() => setIsOpen(false)}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="h-[1px] w-full bg-white" />
        <div className="flex w-full flex-col gap-3 px-4 pb-4">
          <Tabs
            tabList={tabsExchangeType}
            style="monochromatic"
            roundStyle="straight"
          />
          <TokenSwapItem
            label={exchangeType === 0 ? `Deposit` : 'Withdraw'}
            value={quantity}
            onValueChange={setQuantity}
            tokenSelect={<div className="text-2xl">USD</div>}
            secondaryText={`Max: 0.00`}
          />

          <div className="flex flex-col">
            <div className="flex w-full justify-between text-sm ">
              <span className="text-text-purple">{`Leverage`}</span>
              <div>{position.leverageStr}</div>
            </div>
          </div>
          <div className="flex h-[0.5px] w-full bg-darkBg" />
          <div className="flex flex-col">
            <div className="flex w-full justify-between text-sm ">
              <span className="text-text-purple">{`Mark Price`}</span>
              <div>
                {formatNumber(position.markPrice, {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
            <div className="flex w-full justify-between text-sm ">
              <span className="text-text-purple">{`Entry Price`}</span>
              <div>
                {formatNumber(position.entryPrice, {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
            <div className="flex w-full justify-between text-sm ">
              <span className="text-text-purple">{`Allowed Slippage`}</span>
              <div>
                {formatNumber(position.liqPrice, {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
          </div>
          <div className="flex h-[0.5px] w-full bg-darkBg" />
          <div className="flex flex-col">
            <div className="flex w-full justify-between text-sm ">
              <span className="text-text-purple">{`Size`}</span>
              <div>
                {formatNumber(position.size, { decimalCases: 2, symbol: '$' })}
              </div>
            </div>
            <div className="flex w-full justify-between text-sm ">
              <span className="text-text-purple">{`Collateral (${position.collateralToken.symbol})`}</span>
              <div>
                {formatNumber(position.collateral, {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
            <div className="flex w-full justify-between text-sm ">
              <span className="text-text-purple">{`Fees`}</span>
              <div>{formatNumber(fees, { decimalCases: 2, symbol: '$' })}</div>
            </div>
          </div>

          <Button
            label={
              quantity <= 0
                ? 'Enter an amount'
                : exchangeType === 0
                ? 'Deposit'
                : 'Withdraw'
            }
            size="lg"
          />
        </div>
      </div>
    </Modal>
  )
}
export default GMXPositionCollateralModal
