import Button from '@/components/shared/Button'
import CustomConnectButton from '@/components/shared/CustomConnectButton'
import CustomSlider from '@/components/shared/CustomSlider'
import Select from '@/components/shared/Form/Select'
import TokenSwapItem from '@/components/shared/Swap/TokenSwapItem'
import { ADDRESS_ZERO, GMX_ROUTER_ADDRESS, Token } from '@/constants'
import { useMarket } from '@/store/tokenStore'
import formatNumber from '@/utils/formatNumber'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { formatEther, parseEther } from 'viem'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'
import { writeContract } from '@wagmi/core'

const leverageMarks = {
  1.1: { label: '1.1x', style: { color: '#A3a3b1' } },
  5: { label: '5x', style: { color: '#A3a3b1' } },
  10: { label: '10x', style: { color: '#A3a3b1' } },
  15: { label: '15x', style: { color: '#A3a3b1' } },
  20: { label: '20x', style: { color: '#A3a3b1' } },
  25: { label: '25x', style: { color: '#A3a3b1' } },
}

const sizeMarks = {
  0: { label: '0%', style: { color: '#A3a3b1' } },
  25: { label: '25%', style: { color: '#A3a3b1' } },
  50: { label: '50%', style: { color: '#A3a3b1' } },
  75: { label: '75%', style: { color: '#A3a3b1' } },
  100: { label: '100%', style: { color: '#A3a3b1' } },
}

type GMXLongShortProps = {
  tokens: Token[]
  exchangeType: 'market' | 'limit'
  strategy: 'long' | 'short'
}

const GMXLongShort: React.FC<GMXLongShortProps> = ({
  tokens,
  exchangeType,
  strategy,
}) => {
  const market = useMarket()
  const { address } = useAccount()

  const [leverageOption, setLeverageOption] = useState<number | number[]>(1.1)

  const [sizePercentage, setSizePercentage] = useState<number | number[]>(0)

  const infoItems: { key: number; label: string; value: string | number }[] = [
    //TODO: change values to real data
    { key: 0, label: 'Collateral in', value: 'USD' },
    {
      key: 1,
      label: 'Entry Price',
      value: formatNumber(123, { symbol: '$', decimalCases: 2 }),
    },
    {
      key: 2,
      label: 'Liq. Price',
      value: formatNumber(-1685, { symbol: '$', decimalCases: 2 }),
    },
    {
      key: 3,
      label: 'Fees',
      value: formatNumber(15.12, { symbol: '$', decimalCases: 2 }),
    },
  ]

  const extraInfoItems: {
    key: number
    label: string
    value: string | number
  }[] = [
    //TODO: change values to real data
    {
      key: 0,
      label: 'Entry Price',
      value: formatNumber(123, { symbol: '$', decimalCases: 2 }),
    },
    {
      key: 1,
      label: 'Exit Price',
      value: formatNumber(123, { symbol: '$', decimalCases: 2 }),
    },
    {
      key: 2,
      label: 'Borrow Fee',
      value: `${formatNumber(0.000055, {
        symbol: '%',
        isSymbolEnd: true,
        decimalCases: 4,
      })} / 1h`,
    },
    {
      key: 3,
      label: 'Available Liquidity',
      value: formatNumber(2843643.15, { symbol: '$', decimalCases: 2 }),
    },
  ]

  const [limitPrice, setLimitPrice] = useState<number>()

  const [token, setToken] = useState<
    Token & {
      quantity: number
    }
  >({ ...tokens[0]!, quantity: 0 })

  const getSubmitBtnLabel = () => {
    if (!token.quantity || token.quantity <= 0) return 'Enter an amount'

    return exchangeType === 'market' ? 'Enable Leverage' : 'Enable Orders'
  }

  const { data: tokenAllowance } = useContractRead({
    address: token.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address ?? ADDRESS_ZERO, GMX_ROUTER_ADDRESS],
    enabled: !!address && token.isERC20,
  })

  const getSubmitBtn = () => {
    console.log({
      tokenAllowance,
    })
    if (
      token.isERC20 &&
      address &&
      token?.quantity &&
      tokenAllowance !== undefined
    ) {
      if (+formatEther(tokenAllowance) < token?.quantity)
        return (
          <Button
            label={`Approve ${token.label}`}
            size="lg"
            labelColor="dark"
            onClick={setTokenAllowance}
          />
        )
    }
    return (
      <Button
        label={getSubmitBtnLabel()}
        size="lg"
        labelColor="dark"
        isDisabled={!token?.quantity}
      />
    )
  }

  const setTokenAllowance = async () => {
    if (token.isERC20 && address) {
      const { hash } = await writeContract({
        address: token.address,
        abi: erc20ABI,
        functionName: 'approve',
        args: [GMX_ROUTER_ADDRESS, parseEther(`${token.quantity}`)],
      })

      console.log('DONE', hash)
    }
  }

  const getTokenBalance = () => {
    //TODO: get token balance
  }

  return (
    <>
      <AnimatePresence initial={false}>
        {exchangeType === 'limit' && (
          <motion.div
            layout="position"
            key="tokenswapprice"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            <TokenSwapItem
              label={'Price'}
              value={limitPrice}
              onValueChange={setLimitPrice}
              secondaryText={'Mark: 1,564.21'}
              tokenSelect={
                <span className="pr-2 text-sm font-normal text-gray-300">
                  USD
                </span>
              }
              placeholder="0.0"
            />
          </motion.div>
        )}
        <motion.div
          key="tokenswapsize"
          layout="position"
          transition={{ duration: 0.3 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <TokenSwapItem
            label={'Size'}
            value={token.quantity}
            placeholder="0.0"
            onValueChange={(qt) =>
              setToken((prev) => ({ ...prev, quantity: qt }))
            }
            tokenSelect={
              <Select
                tokenAssetType="short"
                items={tokens}
                selectedItem={token}
                setSelectedItem={(
                  token: any //TODO fix types
                ) =>
                  setToken({
                    ...token,
                    quantity: 0,
                  })
                }
                style="no-style"
              />
            }
            secondaryText={`Balance ${getTokenBalance()}`}
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
        </motion.div>
        <motion.div
          layout="position"
          transition={{
            duration: 0.3,
          }}
          key="items-container"
          className="flex flex-col gap-5 rounded bg-gray-500 p-3"
        >
          <div
            key="leverageSlider"
            className="mb-4 flex flex-col gap-2 text-sm"
          >
            <div className="flex justify-between">
              <div className="text-xs font-normal text-gray-300">
                Leverage slider
              </div>
              <div className="text-sm text-primary">{leverageOption}x</div>
            </div>
            <div className="mx-2 ">
              <CustomSlider
                option={leverageOption}
                setOption={setLeverageOption}
                marks={leverageMarks}
                min={1.1}
                max={25}
                step={0.1}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {infoItems.map((item) => (
              <div key={item.key} className="flex justify-between">
                <div className="text-xs font-normal text-gray-300">
                  {item.label}
                </div>
                <div className="text-sm">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div id="gmxbtn" layout="position">
          {address ? (
            getSubmitBtn()
          ) : (
            <CustomConnectButton style="normal" size="lg" />
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        layout
        id="gmxextrainfo"
        className="flex flex-col gap-2 rounded bg-gray-500 p-3"
      >
        <div>
          {strategy.charAt(0).toUpperCase() + strategy.slice(1)} {market.label}
        </div>
        {extraInfoItems.map((item) => (
          <div key={item.key} className="flex justify-between">
            <div className="text-xs font-normal text-gray-300">
              {item.label}
            </div>
            <div className="text-sm">{item.value}</div>
          </div>
        ))}
      </motion.div>
    </>
  )
}
export default GMXLongShort
