import Modal from '../shared/Modal'
import { RxCross2 } from 'react-icons/rx'
import Tabs from '../shared/Tabs'
import { TabType } from '@/types/next'
import { useState } from 'react'
import TokenSwapItem from '../shared/Swap/TokenSwapItem'
import formatNumber from '@/utils/formatNumber'
import Button from '../shared/Button'
import Input from '../shared/Form/Input'
import { formatEther } from 'ethers/lib/utils.js'
import Select from '../shared/Form/Select'
import { IoCloseOutline } from 'react-icons/io5'
import CustomSlider from '../shared/CustomSlider'
import clsx from 'clsx'

type GMXClosePositionModalProps = {
  position: GMXPosition
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
const sizeMarks = {
  0: { label: '0%', style: { color: '#A3a3b1' } },
  25: { label: '25%', style: { color: '#A3a3b1' } },
  50: { label: '50%', style: { color: '#A3a3b1' } },
  75: { label: '75%', style: { color: '#A3a3b1' } },
  100: { label: '100%', style: { color: '#A3a3b1' } },
}

const GMXClosePositionModal: React.FC<GMXClosePositionModalProps> = ({
  position,
  isOpen,
  setIsOpen,
}) => {
  const [exchangeType, setExchangeType] = useState<'market' | 'limit'>('market') //these are numbers to manual control tabs; 0- market 1- trigger

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
  ]

  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const [keepLeverage, setkeepLeverage] = useState(true)
  const [allowSlippage, setallowSlippage] = useState(false)
  const [allowedSlippage, setAllowedSlippage] = useState(0.003)
  const [fees, setfees] = useState(0.16)

  const tokens: { label: string; value: string }[] = [
    { label: 'ETH', value: 'ETH' },
    { label: 'USDC', value: 'USDC' },
    { label: 'USDT', value: 'USDT' },
    { label: 'BTC', value: 'BTC' },
  ]

  const getFirstToken = () => {
    const token = tokens.find((token) => token.value === position.token.symbol)

    return token
      ? {
          ...token,
          label: `${formatNumber(0, { decimalCases: 4 })} ${
            token.value
          } ${formatNumber(receiveDollars, {
            decimalCases: 2,
            symbol: '$',
          })}`,
          quantity: 0,
        }
      : {
          ...tokens[0]!,
          label: `${formatNumber(0, { decimalCases: 4 })} ${
            tokens[0]!.value
          } ${formatNumber(receiveDollars, {
            decimalCases: 2,
            symbol: '$',
          })}`,
          quantity: 0,
        }
  }

  const [receiveDollars, setreceiveDollars] = useState(0)
  const [receiveToken, setreceiveToken] = useState<{
    label: string
    value: string
    quantity: number
  }>(getFirstToken())
  const [sizePercentage, setSizePercentage] = useState<number | number[]>(0)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex w-96 flex-col items-start gap-3 rounded-lg bg-gray-600 p-5 text-white">
        <div className="flex w-full items-center justify-between text-gray-300">
          <h2 className="text-lg font-normal text-white">{`Close ${position.operation} ${position.token.symbol}`}</h2>
          <span className="cursor-pointer">
            <IoCloseOutline size={24} onClick={() => setIsOpen(false)} />
          </span>
        </div>
        <div className="flex w-full flex-col gap-3 ">
          <Tabs tabList={tabsExchangeType} size="lg" />
          <TokenSwapItem
            label={'Close'}
            value={quantity}
            onValueChange={setQuantity}
            tokenSelect={<div className="text-sm text-gray-300">USD</div>}
            secondaryText={`Max: 0.00`}
            placeholder="0.0"
            complementaryComponent={
              <div className="mx-2 mt-2 mb-6">
                <CustomSlider
                  option={sizePercentage}
                  setOption={setSizePercentage}
                  marks={sizeMarks}
                  min={0}
                  max={100}
                  step={0.1}
                />
              </div>
            }
          />

          <div className="flex flex-col gap-3 rounded bg-gray-500 p-3 text-xs">
            <div className="flex w-full justify-between">
              <span className="text-xs font-normal text-gray-300">{`Keep leverage at ${position.leverageStr}`}</span>
              <Input
                type="checkbox"
                value={''}
                size="checkbox"
                checked={keepLeverage}
                onChange={() => setkeepLeverage(!keepLeverage)}
              />
            </div>
            {exchangeType === 'market' && (
              <>
                <div className="flex w-full justify-between ">
                  <span className="text-xs font-normal text-gray-300">{`Allow up to 1% slippage`}</span>
                  <Input
                    type="checkbox"
                    value={''}
                    size="checkbox"
                    checked={allowSlippage}
                    onChange={() => {
                      setallowSlippage((prev) => {
                        prev
                          ? setAllowedSlippage(0.003)
                          : setAllowedSlippage(0.01)
                        return !prev
                      })
                    }}
                  />
                </div>
                <div className="flex w-full justify-between  ">
                  <span className="text-xs font-normal text-gray-300">
                    {' '}
                    {`Allowed Slippage`}
                  </span>
                  <div>
                    {formatNumber(allowedSlippage, {
                      decimalCases: 2,
                      isSymbolEnd: true,
                      symbol: '%',
                    })}
                  </div>
                </div>
              </>
            )}
            {exchangeType === 'limit' && (
              <div className="flex w-full justify-between  ">
                <span className="text-gray-300">Trigger</span>
                <div>-</div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 rounded bg-gray-500 p-3 text-xs">
            <div className="flex w-full justify-between">
              <span className="text-gray-300">{`Mark Price`}</span>
              <div>
                {formatNumber(+formatEther(position.markPrice), {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
            <div className="flex w-full justify-between  ">
              <span className="text-gray-300">{`Entry Price`}</span>
              <div>
                {formatNumber(+formatEther(position.entryPrice), {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
            <div className="flex w-full justify-between  ">
              <span className="text-gray-300">{`Allowed Slippage`}</span>
              <div>
                {formatNumber(+formatEther(position.liqPrice), {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded bg-gray-500 p-3 text-xs">
            <div className="flex flex-col gap-2">
              <div className="flex w-full justify-between ">
                <span className="text-gray-300">{`Size`}</span>
                <div>
                  {formatNumber(+formatEther(position.size), {
                    decimalCases: 2,
                    symbol: '$',
                  })}
                </div>
              </div>
              <div className="flex w-full justify-between  ">
                <span className="text-gray-300">{`Collateral (${position.collateralToken.symbol})`}</span>
                <div>
                  {formatNumber(+formatEther(position.collateral), {
                    decimalCases: 2,
                    symbol: '$',
                  })}
                </div>
              </div>
              {!keepLeverage && (
                <div className="flex w-full justify-between  ">
                  <span className="text-gray-300">{`Leverage`}</span>
                  <div>{position.leverageStr}</div>
                </div>
              )}
              <div className="flex w-full justify-between  ">
                <span className="text-gray-300">{`P&L`}</span>
                <div
                  className={clsx({
                    'text-red-400': +position.deltaStr < 0,
                    'text-green-400': +position.deltaStr > 0,
                  })}
                >
                  {formatNumber(+position.deltaStr, {
                    decimalCases: 2,
                    displayPositive: true,
                  })}
                </div>
              </div>
              <div className="flex w-full justify-between  ">
                <span className="text-gray-300">{`Fees`}</span>
                <div>
                  {formatNumber(fees, { decimalCases: 2, symbol: '$' })}
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between  ">
              <span className="text-gray-300">{`Receive`}</span>
              <Select
                items={tokens}
                selectedItem={receiveToken}
                setSelectedItem={(token: { label: string; value: string }) =>
                  setreceiveToken({
                    label: `${formatNumber(0, { decimalCases: 4 })} ${
                      token.value
                    } (${formatNumber(receiveDollars, {
                      decimalCases: 2,
                      symbol: '$',
                    })})`,
                    value: token.value,
                    quantity: 0,
                  })
                }
                style="no-style"
                textColor="white"
                fontSize="xs"
              />
            </div>
          </div>

          <Button label={'Approve and Sign'} size="lg" labelColor="dark" />
        </div>
      </div>
    </Modal>
  )
}
export default GMXClosePositionModal
