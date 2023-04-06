import { useState } from 'react'
import TokenSwapItem from './TokenSwapItem'
import Select from '../Form/Select'
import { HiArrowsUpDown } from 'react-icons/hi2'
import Button from '../Button'

type TokenSwapProps = {
  tokens: { label: string; value: string }[]
  exchangeType: number //0- market 1- limit
}
const TokenSwap: React.FC<TokenSwapProps> = ({ tokens, exchangeType }) => {
  const swap = () => {
    setFirstToken(secondToken)
    setSecondToken(firstToken)
  }
  const [firstToken, setFirstToken] = useState<{
    label: string
    value: string
    quantity: number
  }>({ quantity: 0, ...tokens[0]! })
  const [secondToken, setSecondToken] = useState<{
    label: string
    value: string
    quantity: number
  }>({ quantity: 0, ...tokens[1]! })

  const [price, setPrice] = useState(0)

  return (
    <>
      <div className="relative flex flex-col gap-3">
        <TokenSwapItem
          label={'Pay'}
          value={firstToken.quantity}
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
            />
          }
          secondaryText={`Balance 0.000`}
        />
        {/* <div
          className="absolute top-[40%] right-[42%] flex h-10 w-10 items-center justify-center rounded-full bg-primary hover:cursor-pointer"
          onClick={swap}
        >
          <HiArrowsUpDown size={20} />
        </div> */}
        <TokenSwapItem
          label={'Receive'}
          value={secondToken.quantity}
          onValueChange={(qt) =>
            setSecondToken((prev) => ({ ...prev, quantity: qt }))
          }
          tokenSelect={
            <Select
              items={tokens.filter((token) => token.value !== firstToken.value)}
              selectedItem={secondToken}
              setSelectedItem={(token: { label: string; value: string }) =>
                setSecondToken({
                  label: token.label,
                  value: token.value,
                  quantity: 0,
                })
              }
              style="no-style"
            />
          }
          secondaryText={`Balance 0.000`}
          isInputDisabled
        />
      </div>
      {exchangeType === 1 && (
        <TokenSwapItem
          label={'Price'}
          value={price}
          onValueChange={setPrice}
          secondaryText={`Balance 0.000`}
          tokenSelect={`${secondToken.label} per ${firstToken.label}`}
        />
      )}
      <div className="flex justify-between">
        <div>Fees</div>
        <div>-</div>
      </div>
      <Button
        label={firstToken.quantity <= 0 ? 'Enter an amount' : 'Swap'}
        size="lg"
      />
    </>
  )
}
export default TokenSwap
