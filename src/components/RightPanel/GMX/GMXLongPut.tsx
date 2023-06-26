import Button from '@/components/shared/Button'
import CustomConnectButton from '@/components/shared/CustomConnectButton'
import CustomSlider from '@/components/shared/CustomSlider'
import Select from '@/components/shared/Form/Select'
import TokenSwapItem from '@/components/shared/Swap/TokenSwapItem'
import { ADDRESS_ZERO, GMX_ROUTER_ADDRESS, Token } from '@/constants'
import { useMarket, useTokenPrice } from '@/store/tokenStore'
import formatNumber from '@/utils/formatNumber'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { formatEther, parseEther } from 'viem'
import { erc20ABI, useAccount, useBalance, useContractRead } from 'wagmi'
import { writeContract } from '@wagmi/core'
import { toast } from 'react-toastify'
import { getLiquidationPrice } from '@/utils/gmx'

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
  const tokenPrice = useTokenPrice()
  const { address } = useAccount()

  const [leverageOption, setLeverageOption] = useState<number | number[]>(1.1)

  const [sizePercentage, setSizePercentage] = useState<number | number[]>(0)
  const [collateralIn, setCollateralIn] = useState(
    tokens.filter((x) => x.isStable)[0]
  )
  const [token, setToken] = useState<
    Token & {
      quantity: number
    }
  >({ ...tokens[0]!, quantity: 0 })

  const liqPrice = undefined
  // getLiquidationPrice(
  //   strategy === 'long',
  //   BigInt(token?.quantity),
  //   0n,
  //   tokenPrice ? BigInt(Math.round(tokenPrice)) : 0n,
  //   0n,
  //   false
  // )

  // console.log('LIQ', liqPrice)

  const infoItems: { key: number; label: string; value: string | number }[] = [
    //TODO: change values to real data
    {
      key: 1,
      label: 'Entry Price',
      value: tokenPrice
        ? formatNumber(tokenPrice, { symbol: '$', decimalCases: 2 })
        : '-',
    },
    {
      key: 2,
      label: 'Liq. Price',
      value: liqPrice
        ? formatNumber(+formatEther(liqPrice), { symbol: '$', decimalCases: 2 })
        : '-',
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
      value: tokenPrice
        ? formatNumber(tokenPrice, { symbol: '$', decimalCases: 2 })
        : '-',
    },
    {
      key: 1,
      label: 'Exit Price',
      value: tokenPrice
        ? formatNumber(tokenPrice, { symbol: '$', decimalCases: 2 })
        : '-',
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

  const getSubmitBtnLabel = () => {
    if (!token.quantity || token.quantity <= 0) return 'Enter an amount'

    return exchangeType === 'market' ? 'Enable Leverage' : 'Enable Orders'
  }

  const { data: tokenAllowance } = useContractRead({
    address: token.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address ?? ADDRESS_ZERO, GMX_ROUTER_ADDRESS],
    enabled: !!address && token.isStable,
  })

  const getSubmitBtnAction = () => {
    return undefined //exchangeType === 'market' //TODO
  }

  const getSubmitBtn = () => {
    if (
      token.isStable &&
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

    if (currentBalance && token?.quantity > +currentBalance?.formatted) {
      return (
        <Button
          label={`Insuficient ${token.symbol} funds`}
          size="lg"
          labelColor="dark"
          isDisabled={true}
        />
      )
    }

    return (
      <Button
        label={getSubmitBtnLabel()}
        size="lg"
        labelColor="dark"
        isDisabled={!token?.quantity}
        onClick={getSubmitBtnAction()}
      />
    )
  }

  const setTokenAllowance = async () => {
    if (token.isStable && address) {
      try {
        const { hash } = await writeContract({
          address: token.address,
          abi: erc20ABI,
          functionName: 'approve',
          args: [GMX_ROUTER_ADDRESS, parseEther(`${token.quantity}`)],
        })
        console.log(hash)
      } catch (e) {
        toast.error('Approval cancelled.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      }
    }
  }

  const { data: currentBalance } = useBalance({
    address: address,
    token: token.isNative ? undefined : token.address,
    watch: true,
  })

  console.log(sizePercentage)

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
              setToken((prev) => {
                setSizePercentage(
                  // currentBalance ? (qt * 100) / +currentBalance?.formatted : 0
                  75
                )
                console.log(
                  'PERCENTAGE',
                  currentBalance ? (qt * 100) / +currentBalance?.formatted : 0
                )

                return { ...prev, quantity: qt }
              })
            }
            tokenSelect={
              <Select
                tokenAssetType="short"
                items={tokens}
                selectedItem={token}
                setSelectedItem={(token) =>
                  setToken({
                    ...token,
                    quantity: 0,
                  })
                }
                style="no-style"
              />
            }
            secondaryText={`Balance ${
              currentBalance?.formatted
                ? formatNumber(+currentBalance?.formatted, {
                    decimalCases: 4,
                  })
                : 0
            }`}
            complementaryComponent={
              <div className="mx-2 mt-2 mb-6">
                <CustomSlider
                  option={sizePercentage}
                  setOption={(n) => {
                    if (currentBalance && !Array.isArray(n))
                      setToken((prev) => ({
                        ...prev,
                        quantity: +currentBalance?.formatted * (n / 100),
                      }))
                    return setSizePercentage(n)
                  }}
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
            <div className="flex items-center justify-between">
              <div className="text-xs font-normal text-gray-300">
                Collateral in
              </div>
              <div className="text-sm">
                {strategy === 'long' ? (
                  'USD'
                ) : (
                  <Select
                    items={tokens.filter((token) => token.isStable)}
                    selectedItem={collateralIn}
                    setSelectedItem={(val) => setCollateralIn(val)}
                    style="no-style"
                    textColor="white"
                    fontSize="xs"
                  />
                )}
              </div>
            </div>
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
