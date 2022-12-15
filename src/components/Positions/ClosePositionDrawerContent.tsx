import { PositionType } from '@/types/next'
import formatDateTime from '@/utils/formatDateTime'
import formatNumber from '@/utils/formatNumber'
import { getPercentage } from '@/utils/getPercentage'
import clsx from 'clsx'
import { useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Form/Input'
import Select from '../shared/Form/Select'

type ClosePositionDrawerContentProps = {
  position: PositionType
}

const ClosePositionDrawerContent: React.FC<ClosePositionDrawerContentProps> = ({
  position,
}) => {
  //TODO: make form
  const [contractsToClose, setContractsToClose] = useState(0)
  const feePercentage = 0.01 //TODO fee percentage
  const coins = [{ label: 'USDC' }] //TODO: supported coins
  const [coinSelected, setCoinSelected] = useState<{ label: string }>(coins[0]!)

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 font-medium">
      <div className="flex flex-col items-center gap-1 pb-4">
        <h1 className="text-2.5xl font-semibold">
          {`Sell ${position.token.label.toUpperCase()} ${position.operation}`}
        </h1>
        <h2 className="text-lg ">
          {`Strike ${formatNumber(position.strike, {
            symbol: '$',
            decimalCases: 2,
          })}, Exp ${formatDateTime(new Date())}`}
        </h2>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 items-center gap-x-6 gap-y-4">
        <p>Contracts to close</p>
        <div className="flex justify-end">
          <Input
            type="number"
            value={formatNumber(contractsToClose)}
            onChange={(val: string) => setContractsToClose(+val)}
          />
        </div>
        <p>Sell With</p>
        <div className="flex justify-end">
          <Select
            items={coins}
            selectedItem={coinSelected}
            setSelectedItem={setCoinSelected}
          />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm text-text-purple">Price per option</p>
          <p>
            {formatNumber(position.costPerOption, {
              decimalCases: 2,
              symbol: '$',
            })}
          </p>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-sm text-text-purple">
            Fees{' '}
            {formatNumber(feePercentage * 100, {
              decimalCases: 2,
              symbol: '%',
              isSymbolEnd: true,
            })}
          </p>
          <p>
            {formatNumber(
              position.costPerOption * contractsToClose * feePercentage,
              {
                decimalCases: 2,
                symbol: '$',
              }
            )}
          </p>
        </div>
        <div className="col-span-2 border-t border-text-purple/[.3]"></div>
      </div>
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-text-purple">Profit</p>
          <h1
            className={clsx('text-2.5xl font-semibold', {
              'text-green': position.profit > 0,
              'text-red': position.profit < 0,
            })}
          >
            {formatNumber(position.profit, {
              decimalCases: 2,
              displayPositive: true,
              symbol: '$',
            })}
            {' ('}
            {formatNumber(
              getPercentage(
                position.profit,
                position.costPerOption * position.numContracts
              ),
              { decimalCases: 2, symbol: '%', isSymbolEnd: true }
            )}
            )
          </h1>
        </div>
        <Button label="CLOSE POSITION" styleType="shadow" />
      </div>
    </div>
  )
}

export default ClosePositionDrawerContent