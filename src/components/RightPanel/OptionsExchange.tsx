import { useOptionsActions } from '@/store/optionsStore'
import { TabType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import { useState } from 'react'
import { IoTrendingUpSharp, IoTrendingDownSharp } from 'react-icons/io5'
import Button from '../shared/Button'
import Input from '../shared/Form/Input'
import Select, { SelectItem } from '../shared/Form/Select'
import Tabs from '../shared/Tabs'

const OptionsExchange = () => {
  const { setIsCall } = useOptionsActions()
  const [strikePrice, setStrikePrice] = useState<number>()
  const [quantity, setQuantity] = useState<number>(0)

  const callOrPutTabs: TabType[] = [
    {
      label: 'Call',

      icon: <IoTrendingUpSharp size="1.125rem" />,
      action: () => {
        setIsCall(true)
      },
    },
    {
      label: 'Put',
      icon: <IoTrendingDownSharp size="1.125rem" />,
      action: () => {
        setIsCall(false)
      },
    },
  ]

  const strikePrices: TabType[] = [
    {
      label: '1100',
      action: () => setStrikePrice(1300),
    },
    {
      label: '1300',
      action: () => setStrikePrice(1300),
    },
    {
      label: '1500',
      action: () => setStrikePrice(1300),
    },
  ]

  const coins = [
    { label: 'USDC', value: 'USDC' },
    { label: 'USDT', value: 'USDT' },
    { label: 'ETH', value: 'ETH' },
  ] //TODO: supported coins
  const [coinSelected, setCoinSelected] = useState<SelectItem<string>>(
    coins[0]!
  )
  const margin = 34.2 //TODO
  const value = 52 //TODO
  const cost = 3 //TODO

  return (
    <div className="flex h-full flex-col items-center gap-8">
      <div className="flex w-full justify-between text-lg">
        <div>Available Margin</div>
        <div>{formatNumber(margin, { decimalCases: 2, symbol: '$' })}</div>
      </div>
      <Tabs tabList={callOrPutTabs} size="lg" style="monochromatic" />
      <div className="flex w-full grow-0 flex-col gap-1 text-text-purple">
        <div>Strike Price</div>
        <Tabs tabList={strikePrices} size="lg" style="monochromatic" />
      </div>
      <div className="flex w-full flex-col gap-1 text-text-purple">
        <div>Quantity</div>
        <div className="flex w-full">
          <Input
            value={quantity.toString()}
            type="string"
            size="lg"
            onChange={(n: string) =>
              +n > 0 ? setQuantity(+n) : setQuantity(0)
            }
          />
          <Select
            items={coins}
            selectedItem={coinSelected}
            setSelectedItem={setCoinSelected}
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full justify-between text-lg">
          <div>Value</div>
          <div>{`${value} ${coinSelected.label}`}</div>
        </div>
        <div className="flex w-full justify-between text-lg">
          <div>Cost</div>
          <div>{`${cost} ${coinSelected.label}`}</div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Button label={'Buy / Long'} size="lg" styleType="green" />
        <Button label={'Sell / Short'} size="lg" styleType="red" />
      </div>
    </div>
  )
}

export default OptionsExchange
