import {
  useIsOptionCall,
  useIsOptionSell,
  useOptionsActions,
} from '@/store/optionsStore'
import { useTokenAddress } from '@/store/tokenStore'
import { OptionType, TabType } from '@/types/next'
import formatDateTime from '@/utils/formatDateTime'
import formatNumber from '@/utils/formatNumber'
import lyra from '@/utils/getLyraSdk'
import getMarketName from '@/utils/getMarketName'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { formatEther } from 'ethers/lib/utils.js'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HiOutlineArrowDownTray, HiOutlineArrowUpTray } from 'react-icons/hi2'
import { IoTrendingUpSharp, IoTrendingDownSharp } from 'react-icons/io5'
import { useAccount } from 'wagmi'

import Button from '../shared/Button'
import Input from '../shared/Form/Input'
import Select, { SelectItem } from '../shared/Form/Select'
import Tabs from '../shared/Tabs'
import LineChart from './LineChart'

type BuySellOptionsProps = {}
const calcPayoff = (
  tokenPrice: number,
  strike: number,
  pricePerOption: number,
  isCall: boolean
) => {
  if (isCall) {
    return Math.max(0, tokenPrice - strike) - pricePerOption
  } else {
    return Math.max(0, strike - tokenPrice) - pricePerOption
  }
}
const calcChartData = (
  maxRange: number,
  numContracts: number,
  isSell: boolean,
  isCall: boolean,
  strikePrice: number,
  pricePerOption: number
) => {
  const data: { tokenPrice: number; payoff: number }[] = []

  for (let index = 0; index < maxRange; index += 5) {
    data.push({
      tokenPrice: index,
      payoff:
        (isSell
          ? -1 * calcPayoff(index, strikePrice, pricePerOption, isCall)
          : calcPayoff(index, strikePrice, pricePerOption, isCall)) *
        numContracts,
    })
  }
  return data
}

const BuySellOptions: React.FC<BuySellOptionsProps> = ({}) => {
  const { setIsCall, setIsSell, setExpDate } = useOptionsActions()

  const router = useRouter()
  const tokenSymbol = router.asPath.split('/').pop()
  const { address, isConnecting, isDisconnected } = useAccount()
  const isCall = useIsOptionCall()
  const isSell = useIsOptionSell()

  const pricePerOption = 100
  const strikePrice = 1400
  const expiryTime = new Date().setDate(new Date().getDate() + 1)
  const breakEven = 1450

  const isBelow: boolean = (isSell && isCall) || (!isSell && !isCall)
  const coins = [{ label: 'USDC', value: 'USDC' }] //TODO: supported coins
  const currentBalance = 0 //TODO: should be replaced when user is set
  const feePercentage = 0.01
  const [coinSelected, setCoinSelected] = useState<SelectItem<string>>(
    coins[0]!
  )
  const tokenAddress = useTokenAddress()
  const [numContracts, setNumContracts] = useState<number>(1)
  const [fees, setFees] = useState<number>(1)

  const { data: market } = useQuery({
    queryKey: ['market', tokenAddress],
    queryFn: async () => await lyra.market(tokenAddress),
    refetchInterval: 10000,
  })

  const maxRange =
    (market ? parseFloat(formatEther(market?.spotPrice)) : 0) * 1.6

  const renderChartTooltip = (payload: {
    tokenPrice: number
    payoff: number
  }) => {
    return (
      <div className=" ml-[-100%] flex flex-col items-center text-xs text-text-purple">
        <p>
          {market ? getMarketName(market) : undefined} Price at Exp{' '}
          {formatNumber(payload.tokenPrice, { decimalCases: 2, symbol: '$' })}
        </p>
        <p>
          Payoff{' '}
          <span
            className={clsx({
              'text-green': payload.payoff > 0,
              'text-red': payload.payoff < 0,
            })}
          >
            {formatNumber(payload.payoff, { decimalCases: 2, symbol: '$' })}
          </span>
        </p>
      </div>
    )
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(e)
  }

  const buyOrSellTabs: TabType[] = [
    {
      label: 'Buy',
      icon: <HiOutlineArrowDownTray size="1.125rem" />,
      action: () => {
        setIsSell(false)
      },
    },
    {
      label: 'Sell',
      icon: <HiOutlineArrowUpTray size="1.125rem" />,
      action: () => {
        setIsSell(true)
      },
    },
  ]

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

  return (
    <>
      <div className="flex flex-col items-center gap-1 overflow-y-auto ">
        <div className="mb-8 flex items-start gap-6">
          <Tabs tabList={buyOrSellTabs} />
          <Tabs tabList={callOrPutTabs} />
        </div>
        <div className="text-2.5xl font-semibold">
          {`${isSell ? 'Sell' : 'Buy'} ${
            market ? getMarketName(market) : undefined
          } ${isCall ? 'Call' : 'Put'}`}
        </div>
        <div className="flex text-lg ">
          {`Strike ${formatNumber(strikePrice, {
            decimalCases: 2,
            symbol: '$',
          })}
          , Exp ${formatDateTime(new Date(expiryTime))}`}
        </div>
      </div>
      <div className="flex items-start justify-center gap-1 overflow-visible pb-4 text-xs text-text-purple">
        {`You bet on ${market ? getMarketName(market) : undefined} being `}
        <span
          className={clsx({
            'text-red': isBelow,
            'text-green': !isBelow,
          })}
        >
          {`${isBelow ? ' below' : ' above'} ${formatNumber(strikePrice, {
            decimalCases: 2,
            symbol: '$',
          })}`}
        </span>
        {`on ${formatDateTime(new Date(expiryTime), {
          hideHours: false,
        })}`}
      </div>
      {/* row  */}
      <form className="flex flex-col gap-4  px-10" onSubmit={onSubmit}>
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
              isDisabled={true}
            />
          </div>
        </div>
        {/* row  */}
        <div className="flex  items-center justify-between ">
          <div>
            <div className="text-sm text-text-purple">Price per option</div>
            <div>
              {formatNumber(pricePerOption, { decimalCases: 2, symbol: '$' })}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm text-text-purple">
              Fees {feePercentage * 100}%
            </div>
            <div>
              {formatNumber(pricePerOption * numContracts * feePercentage, {
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
              {formatNumber(
                (1 + feePercentage) * numContracts * pricePerOption,
                {
                  decimalCases: 2,
                  symbol: '$',
                }
              )}
            </div>
          </div>
        </div>
        {/* divider */}
        <div className="border border-solid border-input-border"></div>
        <>
          {/* selling secion  */}
          {/* {isSell && (
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
          <div className="text-lg font-semibold text-primary">{`Total ${
            coinSelected.label
          } ${formatNumber(
            (1 + feePercentage) * numContracts * pricePerOption,
            {
              decimalCases: 2,
              symbol: '$',
            }
          )}`}</div>
          <Button
            isDisabled
            styleType="shadow"
            type="submit"
            label={`${isSell ? 'SELL' : 'BUY'} ${
              market ? getMarketName(market) : undefined
            } ${isCall ? 'CALL' : 'PUT'}`}
          />

          <div className="flex items-start gap-2 py-2 text-xs text-text-purple">
            {`Current Balance ${formatNumber(currentBalance, {
              decimalCases: 2,
              symbol: '$',
            })}`}
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-5 px-5">
        <LineChart
          data={calcChartData(
            maxRange,
            numContracts,
            isSell,
            isCall,
            strikePrice,
            pricePerOption
          )}
          renderTooltip={renderChartTooltip}
        />
        <p className="flex justify-center text-xs text-text-purple">
          Break Even {formatNumber(breakEven, { decimalCases: 2, symbol: '$' })}
        </p>
      </div>
    </>
  )
}

export default BuySellOptions
