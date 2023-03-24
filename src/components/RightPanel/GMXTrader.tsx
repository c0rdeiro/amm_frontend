import { TabType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import Slider from 'rc-slider'
import { useContext, useState } from 'react'
import { IoTrendingUpSharp, IoTrendingDownSharp } from 'react-icons/io5'
import Button from '../shared/Button'
import Select from '../shared/Form/Select'
import TokenSwapItem from '../shared/Swap/TokenSwapItem'
import Tabs from '../shared/Tabs'
import 'rc-slider/assets/index.css'
import { ThemeContext } from '@/providers/ThemeProvider'

const leverageMarks = {
  2: { label: '2x' },
  5: { label: '5x' },
  10: { label: '10x' },
  15: { label: '15x' },
  20: { label: '20x' },
  25: { label: '25x' },
  30: { label: '30x' },
  35: { label: '35x' },
  40: { label: '40x' },
  45: { label: '45x' },
  50: { label: '50x' },
}

const GMXTrader = () => {
  const { isDarkTheme } = useContext(ThemeContext)
  const [isLong, setIsLong] = useState<boolean>(true)
  const [leverageOption, setLeverageOption] = useState<number | number[]>(1.1)
  const [exchangeType, setExchangeType] = useState<
    'market' | 'limit' | 'trigger'
  >('market')
  const tabsLongShort: TabType[] = [
    {
      key: 0,
      label: 'Long',

      icon: <IoTrendingUpSharp size="1.125rem" />,
      action: () => {
        setIsLong(true)
      },
    },
    {
      key: 1,
      label: 'Short',
      icon: <IoTrendingDownSharp size="1.125rem" />,
      action: () => {
        setIsLong(false)
      },
    },
  ]

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
    {
      key: 2,
      label: 'Trigger',
      action: () => setExchangeType('trigger'),
    },
  ]

  const infoItems: { label: string; value: string | number }[] = [
    //TODO: change values to real data
    { label: 'Collateral in', value: 'USD' },
    { label: 'Leverage', value: `${leverageOption}x` },
    {
      label: 'Entry Price',
      value: formatNumber(123, { symbol: '$', decimalCases: 2 }),
    },
    {
      label: 'Liq. Price',
      value: formatNumber(-1685, { symbol: '$', decimalCases: 2 }),
    },
    {
      label: 'Fees',
      value: formatNumber(15.12, { symbol: '$', decimalCases: 2 }),
    },
  ]

  const tokens = [
    { label: 'USDC', value: 'USDC' },
    { label: 'USDT', value: 'USDT' },
    { label: 'ETH', value: 'ETH' },
    { label: 'BTC', value: 'BTC' },
  ]
  const [firstToken, setFirstToken] = useState(tokens[0])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Tabs tabList={tabsLongShort} style="monochromatic" />
        <div className="flex w-min">
          <Tabs tabList={tabsExchangeType} style="no-style" size="sm" />
        </div>
        {exchangeType !== 'trigger' && (
          <TokenSwapItem
            label={'Pay'}
            value={0}
            tokenSelect={
              <Select
                items={tokens}
                selectedItem={firstToken}
                setSelectedItem={setFirstToken}
                style="no-style"
              />
            }
            secondaryText={`Balance 0.000`}
          />
        )}
        {exchangeType === 'limit' && (
          <TokenSwapItem
            label={'Price'}
            value={0}
            secondaryText={'Mark: 1,564.21'}
            tokenSelect={<span>USD</span>}
          />
        )}
      </div>
      <div className="mb-4 flex flex-col gap-2 pb-8 text-sm">
        <div>Leverage slider</div>
        <Slider
          min={1.1}
          max={50}
          step={0.1}
          marks={leverageMarks}
          onChange={(value) => setLeverageOption(value)}
          defaultValue={leverageOption}
          trackStyle={{
            background: '#2e979a',
          }}
          handleStyle={{
            background: isDarkTheme ? '#2E2E3A' : '#AEAEBE',
            border: 'solid 2px #2e979a',
          }}
          railStyle={{
            background: isDarkTheme ? '#2E2E3A' : '#AEAEBE',
          }}
          dotStyle={{
            border: 'none',
            width: '2px',
            backgroundColor: '#2e979a', //isDarkTheme ? '#2E2E3A' : '#AEAEBE',
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        {infoItems.map((item, key) => (
          <div key={key} className="flex justify-between">
            <div>{item.label}</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>
      <Button label={'Trade'} size="lg" />
    </div>
  )
}

export default GMXTrader
