import BTCIcon from '@/Icons/tokens/btc'
import ETHIcon from '@/Icons/tokens/eth'
import USDCIcon from '@/Icons/tokens/usdc'
import USDTIcon from '@/Icons/tokens/usdt'
import { TabType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

import Button from '../shared/Button'
import Select from '../shared/Form/Select'
import Modal from '../shared/Modal'
import Tabs from '../shared/Tabs'
import Input from '../shared/Form/Input'

type IVXDepositWithdrawModalProps = {
  isOpen: boolean
  setIsOpen: (flag: boolean) => void
}

const tokens = [
  { label: 'ETH', value: 'ETH', icon: <ETHIcon size={18} /> },
  { label: 'USDC', value: 'USDC', icon: <USDCIcon size={18} /> },
  { label: 'USDT', value: 'USDT', icon: <USDTIcon size={18} /> },
  { label: 'BTC', value: 'BTC', icon: <BTCIcon size={18} /> },
]

const IVXDepositWithdrawModal: React.FC<IVXDepositWithdrawModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [depositWithdraw, setDepositWithdraw] = useState<
    'Deposit' | 'Withdraw'
  >('Deposit')

  const [token, setToken] = useState<{
    label: string
    value: string
  }>({ ...tokens[0]! })

  const [amount, setAmount] = useState<number | undefined>()

  const depositWithdrawTabs: TabType[] = [
    {
      key: 0,
      label: 'Deposit',
      action: () => {
        setDepositWithdraw('Deposit')
      },
    },
    {
      key: 1,
      label: 'Withdraw',
      action: () => {
        setDepositWithdraw('Withdraw')
      },
    },
  ]

  const confirm = () => {
    console.log('confirm') //TODO: confirm logic
  }
  const setMaxAmount = () => {
    console.log('set max amount') // TODO: max amount logic
  }
  const availableMargin = 1

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex w-96 flex-col items-start gap-3 rounded-lg bg-gray-600 p-5">
        <div className="flex w-full items-center justify-between text-gray-300">
          <h2 className="text-lg font-normal text-white">Deposit / Withdraw</h2>
          <IoCloseOutline size={24} onClick={() => setIsOpen(false)} />
        </div>
        <span className="w-full border border-gray-500" />
        <Tabs tabList={depositWithdrawTabs} size="lg" />
        <div className="flex w-full flex-col items-start gap-3 rounded bg-gray-500 p-3 ">
          <h5 className="text-xs font-normal text-gray-300">Asset</h5>
          <Select
            items={tokens}
            selectedItem={token}
            setSelectedItem={(token: { label: string; value: string }) =>
              setToken(token)
            }
            size="lg"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-3 rounded bg-gray-500 p-3">
          <h5 className="text-xs font-normal text-gray-300">Amount</h5>

          <div className="relative w-full">
            <Input
              value={amount?.toString()}
              onChange={(e) => setAmount(+e)}
              type="number"
              placeholder="0.0"
              size="lg"
              styleType="discrete"
            />
            <span
              className="absolute right-0 top-0 flex h-full items-center justify-center px-3 text-gray-300"
              onClick={setMaxAmount}
            >
              MAX
            </span>
          </div>
          <span className="w-full border border-gray-400" />
          <div className="flex w-full justify-between">
            <h4 className="flex items-center gap-1 text-xs  font-normal text-gray-300">
              <span>Available</span>
              <div className="rounded-md bg-gray-400 bg-opacity-70 p-1 text-white opacity-70">
                {token.value}
              </div>
            </h4>
            <h3 className="text-sm text-white">
              {formatNumber(0, { symbol: '$', decimalCases: 2 })}
            </h3>
          </div>
        </div>
        <Button
          label={depositWithdraw}
          onClick={confirm}
          size="lg"
          labelColor="dark"
        />
        <div className="flex w-full items-start justify-between gap-3 rounded bg-gray-500 p-3 text-sm font-normal text-white">
          <h3>Available Margin</h3>
          <h3>
            {formatNumber(availableMargin, { decimalCases: 2, symbol: '$' })}
          </h3>
        </div>
      </div>
    </Modal>
  )
}
export default IVXDepositWithdrawModal
