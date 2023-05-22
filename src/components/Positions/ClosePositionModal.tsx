import BTCIcon from '@/Icons/tokens/btc'
import ETHIcon from '@/Icons/tokens/eth'
import USDCIcon from '@/Icons/tokens/usdc'
import USDTIcon from '@/Icons/tokens/usdt'
import { useState } from 'react'
import {
  IoCloseOutline,
  IoTrendingUpSharp,
  IoTrendingDownSharp,
} from 'react-icons/io5'

import Button from '../shared/Button'
import Select from '../shared/Form/Select'
import Modal from '../shared/Modal'
import TokenSwapItem from '../shared/Swap/TokenSwapItem'
import CustomSlider from '../shared/CustomSlider'
import clsx from 'clsx'
import formatNumber from '@/utils/formatNumber'
import getIconFancyIcon from '@/utils/getIconFancyIcon'
import { formatEther } from 'viem'

type ClosePositionModalProps = {
  isOpen: boolean
  setIsOpen: (flag: boolean) => void
  position: IVXPositionType
}

const sizeMarks = {
  0: { label: '0%', style: { color: '#A3a3b1' } },
  25: { label: '25%', style: { color: '#A3a3b1' } },
  50: { label: '50%', style: { color: '#A3a3b1' } },
  75: { label: '75%', style: { color: '#A3a3b1' } },
  100: { label: '100%', style: { color: '#A3a3b1' } },
}
const tokens = [
  { label: 'ETH', value: 'ETH', icon: <ETHIcon size={18} /> },
  { label: 'USDC', value: 'USDC', icon: <USDCIcon size={18} /> },
  { label: 'USDT', value: 'USDT', icon: <USDTIcon size={18} /> },
  { label: 'BTC', value: 'BTC', icon: <BTCIcon size={18} /> },
]

const ClosePositionModal: React.FC<ClosePositionModalProps> = ({
  isOpen,
  setIsOpen,
  position,
}) => {
  const [sizePercentage, setSizePercentage] = useState<number | number[]>(0)

  const confirm = () => {
    console.log('confirm') //TODO: confirm logic
  }

  const [token, setToken] = useState<{
    label: string
    value: string
    quantity: number | undefined
  }>({ ...tokens[0]!, quantity: undefined })

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex w-96 flex-col items-start gap-3 rounded-lg bg-gray-600 p-5">
        <div className="flex w-full items-center justify-between text-gray-300">
          <h2 className="text-lg font-normal text-white">{`Close ${position.operation} ${position.token.symbol}`}</h2>
          <IoCloseOutline size={24} onClick={() => setIsOpen(false)} />
        </div>
        <span className="w-full border border-gray-500" />
        <div className="flex w-full flex-col items-start gap-3 rounded bg-gray-500 p-3 text-white">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={clsx(
                'flex items-center justify-center gap-2 rounded px-2 py-1',
                {
                  'bg-[#0dac8626]': position.strategy === 'Long',
                  'bg-[#e3575926]': position.strategy === 'Short',
                }
              )}
            >
              <span
                className={clsx({
                  'text-green-400': position.strategy === 'Long',
                  'text-red-400': position.strategy === 'Short',
                })}
              >
                {position.strategy === 'Long' ? (
                  <IoTrendingUpSharp size={16} />
                ) : (
                  <IoTrendingDownSharp size={16} />
                )}
              </span>
              {position.strategy}
            </span>
            <span
              className={clsx(
                'flex items-center justify-center gap-2 rounded px-2 py-1',
                {
                  'bg-[#0dac8626]': position.strategy === 'Long',
                  'bg-[#e3575926]': position.strategy === 'Short',
                }
              )}
            >
              {position.operation}
            </span>
            {getIconFancyIcon(position.token)}
            <span>{position.token.symbol}</span>
          </div>
        </div>
        <TokenSwapItem
          label={'Close'}
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
          complementaryComponent={
            <div className="mx-2 mt-2 mb-6">
              <CustomSlider
                option={sizePercentage}
                setOption={setSizePercentage} //TODO: this will alter the size
                marks={sizeMarks}
                min={0}
                max={100}
                step={0.1}
              />
            </div>
          }
        />
        <div className="flex w-full flex-col items-start gap-3 rounded bg-gray-500 p-3 text-xs font-normal">
          <div className="flex w-full justify-between">
            <span className="text-gray-300">Mark Price</span>
            <span className="text-white">
              {formatNumber(+formatEther(position.markPrice), {
                decimalCases: 2,
                symbol: '$',
              })}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-gray-300">Entry Price</span>
            <span className="text-white">
              {formatNumber(+formatEther(position.entryPrice), {
                decimalCases: 2,
                symbol: '$',
              })}
            </span>
          </div>
          <div className="border-gray-300[0.5] w-full border-t" />
          <div className="flex w-full justify-between">
            <span className="text-gray-300">Break even Price</span>
            <span className="text-white">
              {formatNumber(+formatEther(position.breakeven), {
                decimalCases: 2,
                symbol: '$',
              })}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-gray-300">Liquidation Price</span>
            <span className="text-white">
              {formatNumber(+formatEther(position.liqPrice), {
                decimalCases: 2,
                symbol: '$',
              })}
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-3 rounded bg-gray-500 p-3 text-xs">
          <div className="flex w-full justify-between">
            <span className="text-gray-300">P&L</span>
            <span
              className={clsx({
                'text-green-400': position.pnl > 0,
                'text-red-400': position.pnl < 0,
              })}
            >
              {formatNumber(+formatEther(position.pnl), {
                decimalCases: 3,
                displayPositive: true,
              })}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-gray-300">Fees</span>
            <span className={clsx('text-white')}>
              {formatNumber(+formatEther(position.totalFees), {
                decimalCases: 2,
                symbol: '$',
              })}
            </span>
          </div>
        </div>

        <Button
          label="Close Position"
          onClick={confirm}
          size="lg"
          labelColor="dark"
        />
      </div>
    </Modal>
  )
}
export default ClosePositionModal
