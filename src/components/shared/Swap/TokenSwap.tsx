import { useState } from 'react'
import TokenSwapItem from './TokenSwapItem'
import Select from '../Form/Select'
import Button from '../Button'
import { HiArrowsUpDown } from 'react-icons/hi2'
import formatNumber from '@/utils/formatNumber'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'

type TokenSwapProps = {
  tokens: { label: string; value: string }[]
  exchangeType: 'market' | 'limit'
}
const TokenSwap: React.FC<TokenSwapProps> = ({ tokens, exchangeType }) => {
  const [token1Ref, animateToken1] = useAnimate()
  const [token2Ref, animateToken2] = useAnimate()
  const [rotate, setRotate] = useState(false)

  const swap = () => {
    setFirstToken(secondToken)
    setSecondToken(firstToken)
    setRotate((prev) => {
      animateToken1(token1Ref.current, { opacity: [0.2, 1] }, { duration: 0.6 })
      animateToken2(token2Ref.current, { opacity: [0.2, 1] }, { duration: 0.6 })

      return !prev
    })
  }
  const [firstToken, setFirstToken] = useState<{
    label: string
    value: string
    quantity: number | undefined
  }>({ quantity: undefined, ...tokens[0]! })
  const [secondToken, setSecondToken] = useState<{
    label: string
    value: string
    quantity: number | undefined
  }>({ quantity: undefined, ...tokens[1]! })

  const [price, setPrice] = useState<number>()

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
      value: `${formatNumber(0.0000055, {
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

  return (
    <>
      <AnimatePresence>
        <motion.div
          layout="position"
          id="swap-items"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          className="relative flex flex-col gap-3"
        >
          <TokenSwapItem
            label={'Pay'}
            value={firstToken.quantity}
            placeholder="0.0"
            onValueChange={(qt) =>
              setFirstToken((prev) => ({ ...prev, quantity: qt }))
            }
            tokenSelect={
              <Select
                items={tokens.filter(
                  (token) => token.value !== secondToken.value
                )}
                selectedItem={firstToken}
                setSelectedItem={(token: { label: string; value: string }) =>
                  setFirstToken({
                    label: token.label,
                    value: token.value,
                    quantity: 0,
                  })
                }
                style="no-style"
                textRef={token1Ref}
              />
            }
          />
          <motion.div
            animate={{ rotate: rotate ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-[43%] right-[44%] flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:cursor-pointer"
            onClick={swap}
          >
            <HiArrowsUpDown size={20} color="black" />
          </motion.div>
          <TokenSwapItem
            label={'Receive'}
            value={secondToken.quantity}
            placeholder="0.0"
            onValueChange={(qt) =>
              setSecondToken((prev) => ({ ...prev, quantity: qt }))
            }
            tokenSelect={
              <Select
                items={tokens.filter(
                  (token) => token.value !== firstToken.value
                )}
                selectedItem={secondToken}
                setSelectedItem={(token: { label: string; value: string }) =>
                  setSecondToken({
                    label: token.label,
                    value: token.value,
                    quantity: 0,
                  })
                }
                style="no-style"
                textRef={token2Ref}
              />
            }
            isInputDisabled
          />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {exchangeType === 'limit' && (
          <motion.div
            key="swapprice"
            layout="position"
            transition={{ layout: { type: 'tween' }, duration: 0.3 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            <TokenSwapItem
              label={'Price'}
              value={price}
              onValueChange={setPrice}
              secondaryText={`Mark: 1,871.11`}
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
          layout="position"
          className="flex flex-col gap-5 rounded bg-gray-500 p-3"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ layout: { duration: 0.3 } }}
        >
          <div className="flex justify-between">
            <div className="text-xs font-normal text-gray-300">Fees</div>
            <div className="text-sm">-</div>
          </div>
        </motion.div>
      </AnimatePresence>
      <motion.div id="gmxswapbtn" layout="position">
        <Button
          label={
            firstToken.quantity && firstToken.quantity > 0
              ? 'Swap'
              : 'Enter an amount'
          }
          size="lg"
          labelColor="dark"
        />
      </motion.div>
      <motion.div
        layout="position"
        className="flex flex-col gap-2 rounded bg-gray-500 p-3"
      >
        <div>Swap </div>
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
export default TokenSwap
