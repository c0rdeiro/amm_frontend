import { useToken } from '@/store/tokenStore'
import { OptionType } from '@/types/next'
import formatDateTime from '@/utils/formatDateTime'
import formatNumber from '@/utils/formatNumber'
import clsx from 'clsx'
import { useState } from 'react'

import Button from '../shared/Button'
import Input from '../shared/Form/Input'
import Select, { SelectItem } from '../shared/Form/Select'
import LineChart from './LineChart'

type BuySellOptionsProps = {
  option: OptionType
}

const BuySellOptions: React.FC<BuySellOptionsProps> = ({ option }) => {
  const token = useToken()

  const isBelow: boolean =
    (option.isSell && option.isCall) || (!option.isSell && !option.isCall)
  const coins = [{ label: 'USDC', value: 'USDC' }] //TODO: supported coins
  const currentBalance = 12344 //TODO: should be replaced when user is set
  const feePercentage = 0.01
  const [coinSelected, setCoinSelected] = useState<SelectItem>(coins[0]!)
  const [numContracts, setNumContracts] = useState<number>(1)
  const [fees, setFees] = useState<number>(1)
  /* TODO: insert real dates where 'Nov 4...' */

  return (
    <>
      <div className="flex flex-col items-center gap-1 overflow-y-auto">
        <div className="text-2.5xl font-semibold">
          {`${option.isSell ? 'Sell' : 'Buy'} ${token.symbol} ${
            option.isCall ? 'Call' : 'Put'
          }`}
        </div>
        <div className="flex text-lg ">
          {`Strike ${formatNumber(token.price, {
            decimalCases: 2,
            symbol: '$',
          })}
          , Exp ${formatDateTime(option.date)}`}
        </div>
      </div>
      <div className="flex items-start justify-center gap-1 overflow-visible pb-4 text-xs text-text-purple">
        {`You bet on ${token.symbol} being `}
        <span
          className={clsx({
            'text-red': isBelow,
            'text-green': !isBelow,
          })}
        >
          {`${isBelow ? ' below' : ' above'} ${formatNumber(option.strike, {
            decimalCases: 2,
            symbol: '$',
          })}`}
        </span>
        {`on ${formatDateTime(option.date, { hideHours: false })}`}
      </div>
      {/* row  */}
      <div className="flex  items-center justify-between ">
        <div>Contracts to buy</div>
        <div className="w-28">
          <Input
            value={numContracts.toString()}
            type="number"
            onChange={(n: string) =>
              +n > 0 ? setNumContracts(+n) : setNumContracts(0)
            }
          />
        </div>
      </div>
      {/* row  */}
      <div className="flex  items-center justify-between ">
        <div>Buy with</div>
        <div className="w-28">
          <Select
            items={coins}
            selectedItem={coinSelected}
            setSelectedItem={setCoinSelected}
          />
        </div>
      </div>
      {/* row  */}
      <div className="flex  items-center justify-between ">
        <div>
          <div className="text-sm text-text-purple">Price per option</div>
          <div>
            {formatNumber(option.price, { decimalCases: 2, symbol: '$' })}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-text-purple">
            Fees {feePercentage * 100}%
          </div>
          <div>
            {formatNumber(option.price * numContracts * feePercentage, {
              decimalCases: 2,
              symbol: '$',
            })}
          </div>
        </div>
      </div>
      {/* row  */}
      <div className="flex  items-center justify-between ">
        <div>
          <div className="text-sm text-text-purple">Max Profit</div>
          <div>Infinity</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-text-purple">Max Loss</div>
          <div>
            {formatNumber((1 + feePercentage) * numContracts * option.price, {
              decimalCases: 2,
              symbol: '$',
            })}
          </div>
        </div>
      </div>
      {/* divider */}
      <div className="border border-solid border-input-border"></div>
      <>
        {/* selling secion  */}
        {/* {option.isSell && (
        <>
          <div className="flex  items-center justify-between ">
            <div>Covered Call</div>
            <Switch enabled={coveredCall} setEnabled={setCoveredCall} />
          </div>

          <div className="flex  items-center justify-between ">
            <div className="flex flex-col">
              <div>Collateral</div>
              <div className="text-xs text-text-purple">
                $100.00 - $4,020.24
              </div>
            </div>
            <div className="w-28">
              <Input text="$ 120.00" />
            </div>
          </div>
          <div className="flex  items-center justify-between ">
            <div className="flex flex-col">
              <div>Liquidation</div>
              <div className="text-xs text-text-purple">
                $100.00 - $4,020.24
              </div>
            </div>
            <div className="w-28">
              <Input text="$ 120.00" />
            </div>
          </div>
        </>
      )} */}
      </>
      <div className="flex flex-col items-center py-6 xl:gap-2 2xl:gap-4">
        <div className="text-lg font-semibold text-primary">{`Total ${coinSelected.label} $ 148.78`}</div>
        <Button
          styleType="shadow"
          type="submit"
          label={`${
            option.isSell ? 'SELL' : 'BUY'
          } ${token.symbol.toUpperCase()} ${option.isCall ? 'CALL' : 'PUT'}`}
        />
        <div className="flex items-start gap-2 py-2 text-xs text-text-purple">
          {' '}
          {`Current Balance ${formatNumber(currentBalance, {
            decimalCases: 2,
            symbol: '$',
          })}`}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <LineChart />
        <p className="flex justify-center text-xs text-text-purple">
          Break Even{' '}
          {formatNumber(option.breakEven, { decimalCases: 2, symbol: '$' })}
        </p>
      </div>
    </>
  )
}

export default BuySellOptions
