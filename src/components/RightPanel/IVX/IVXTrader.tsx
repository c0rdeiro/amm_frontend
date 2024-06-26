import IVXDepositWithdrawModal from '@/components/Modals/IVXDepositWithdrawModal'
import BTCIcon from '@/Icons/tokens/btc'
import ETHIcon from '@/Icons/tokens/eth'
import USDCIcon from '@/Icons/tokens/usdc'
import USDTIcon from '@/Icons/tokens/usdt'
import { useTokenPrice } from '@/store/tokenStore'
import { TabType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import { calcChartData } from '@/utils/optionsHelpers'
import { useState } from 'react'
import { IoTrendingDownSharp, IoTrendingUpSharp } from 'react-icons/io5'

import IVXLeverageModal from '../../Modals/IVXLeverageModal'
import Button from '../../shared/Button'
import CustomSlider from '../../shared/CustomSlider'
import Select from '../../shared/Form/Select'
import TokenSwapItem from '../../shared/Swap/TokenSwapItem'
import Tabs from '../../shared/Tabs'
import IVXLineChartWrapper from './IVXLineChartWrapper'

const sizeMarks = {
  0: { label: '0%', style: { color: '#A3a3b1' } },
  25: { label: '25%', style: { color: '#A3a3b1' } },
  50: { label: '50%', style: { color: '#A3a3b1' } },
  75: { label: '75%', style: { color: '#A3a3b1' } },
  100: { label: '100%', style: { color: '#A3a3b1' } },
}

const IVXTrader = () => {
  const tokenPrice = useTokenPrice()
  const [strategy, setStrategy] = useState<'call' | 'put' | 'straddle'>('call')
  const [isBuy, setIsBuy] = useState<boolean>(true)
  const [isLeverageModalOpen, setIsLeverageModalOpen] = useState<boolean>(false)
  const [leverage, setLeverage] = useState<number | number[]>(3)
  const [isDepositWithdrawModalOpen, setIsDepositWithdrawModalOpen] =
    useState<boolean>(false)

  const strategyTabs: TabType[] = [
    {
      key: 0,
      label: 'Call',
      rightIcon: <IoTrendingUpSharp size="1.125rem" />,
      action: () => {
        setStrategy('call')
      },
    },
    {
      key: 1,
      label: 'Put',
      rightIcon: <IoTrendingDownSharp size="1.125rem" />,
      action: () => {
        setStrategy('put')
      },
    },
    {
      key: 2,
      label: 'Straddle',
      action: () => {
        setStrategy('straddle')
      },
      isDisabled: true,
    },
  ]

  const buySellTabs: TabType[] = [
    {
      key: 0,
      label: 'Buy',
      action: () => {
        setIsBuy(true)
      },
      bgColor: 'green',
    },
    {
      key: 1,
      label: 'Sell',
      action: () => {
        setIsBuy(false)
      },
      bgColor: 'red',
    },
  ]

  const strikePrices: TabType[] = [
    {
      key: 1700,
      label: '1,700',
      action: () => setStrikePrice(1700),
    },
    {
      key: 1750,
      label: '1,750',
      action: () => setStrikePrice(1750),
    },
    {
      key: 1800,
      label: '1,800',
      action: () => setStrikePrice(1800),
    },
    {
      key: 1850,
      label: '1,850',
      action: () => setStrikePrice(1850),
    },
    {
      key: 1900,
      label: '1,900',
      action: () => setStrikePrice(1900),
    },
  ]
  const [strikePrice, setStrikePrice] = useState<number>(strikePrices[0]!.key)

  const tokens = [
    { label: 'ETH', value: 'ETH', icon: <ETHIcon size={18} /> },
    { label: 'USDC', value: 'USDC', icon: <USDCIcon size={18} /> },
    { label: 'USDT', value: 'USDT', icon: <USDTIcon size={18} /> },
    { label: 'BTC', value: 'BTC', icon: <BTCIcon size={18} /> },
  ]
  const [sizePercentage, setSizePercentage] = useState<number | number[]>(0)

  const availableMargin = 364038.73 //TODO
  const pricePerOption = 100 //TODO
  const fees = 33 //TODO
  const total = 2204.43 //TODO

  const [token, setToken] = useState<{
    label: string
    value: string
    quantity: number | undefined
  }>({ ...tokens[0]!, quantity: undefined })
  const maxRange = (tokenPrice ?? 0) * 1.6

  let lineChartData = undefined

  if (strikePrice)
    lineChartData = calcChartData(
      maxRange,
      strikePrice,
      strategy === 'call',
      isBuy,
      pricePerOption,
      token.quantity ? token.quantity / pricePerOption : 1
    )

  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-r-lg rounded-bl-lg border border-t-0 border-gray-500 bg-gray-600 p-5 text-white">
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col items-start gap-1">
            <h4 className="text-sm font-medium text-gray-300">
              Available Margin
            </h4>
            <h2 className="text-xl font-bold">
              {formatNumber(availableMargin, { symbol: '$', decimalCases: 2 })}
            </h2>
          </div>
          <div className="flex items-start gap-2">
            <Button
              label={'Deposit / Withdraw'}
              styleType="monochromatic"
              size={'xs'}
              labelColor="gray"
              onClick={() => setIsDepositWithdrawModalOpen(true)}
            />
            <Button
              label={`${leverage}x`}
              styleType="monochromatic"
              size={'xs'}
              labelColor="gray"
              onClick={() => setIsLeverageModalOpen(true)}
            />
          </div>
        </div>
        <span className="w-full border border-gray-500" />
        <div className="flex flex-col items-start gap-4">
          <Tabs tabList={strategyTabs} />
          <Tabs tabList={buySellTabs} size="lg" style="custom-color" />
        </div>
        <TokenSwapItem
          label={'Size'}
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
        <span className="flex  w-full flex-col items-start gap-4 md:flex-row xl:flex-col">
          <div className="flex h-auto w-full flex-col gap-2 rounded bg-gray-500 p-3 md:h-44 lg:h-44">
            <div className="flex justify-between text-xs font-normal text-gray-300">
              <div>Strike</div>
            </div>
            <Tabs tabList={strikePrices} roundStyle="separate" size="xs" />
            <div className="flex flex-col items-start justify-between gap-2 pt-3">
              <div className="flex w-full items-center justify-between font-medium">
                <h4 className="text-xs text-gray-300">Price</h4>
                <h4 className="text-xs text-white">
                  {formatNumber(pricePerOption, {
                    decimalCases: 2,
                    symbol: '$',
                  })}
                </h4>
              </div>
              <div className="flex w-full items-center justify-between font-medium">
                <h4 className="text-xs text-gray-300">Fees</h4>
                <h4 className="text-xs text-white">
                  {formatNumber(fees, { decimalCases: 2, symbol: '$' })}
                </h4>
              </div>
              <span className="w-full border-t border-gray-400" />
              <div className="flex w-full items-center justify-between font-medium">
                <h4 className="text-xs text-gray-300">Total</h4>
                <h4 className="text-sm text-white">
                  {formatNumber(total, { decimalCases: 2, symbol: '$' })}
                </h4>
              </div>
            </div>
          </div>

          {lineChartData && (
            <IVXLineChartWrapper
              data={lineChartData}
              strike={strikePrice}
              premium={pricePerOption}
              isCall={strategy === 'call'}
              isBuy={isBuy}
              numContracts={
                token.quantity ? token.quantity / pricePerOption : 1
              }
            />
          )}
        </span>
        <Button label={'Execute'} size="lg" labelColor="dark" />
      </div>
      <IVXLeverageModal
        isOpen={isLeverageModalOpen}
        setIsOpen={setIsLeverageModalOpen}
        leverage={leverage}
        setLeverage={setLeverage}
      />
      <IVXDepositWithdrawModal
        isOpen={isDepositWithdrawModalOpen}
        setIsOpen={setIsDepositWithdrawModalOpen}
      />
    </>
  )
}

export default IVXTrader
