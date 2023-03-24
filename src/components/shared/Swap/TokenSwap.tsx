import { useState } from 'react'
import { HiArrowsUpDown } from 'react-icons/hi2'
import Select from '../Form/Select'
import TokenSwapItem from './TokenSwapItem'

type TokenSwapProps = {
  isLong: boolean
}

const TokenSwap: React.FC<TokenSwapProps> = ({ isLong }) => {
  const swap = () => {
    setFirstToken(secondToken)
    setSecondToken(firstToken)
  }
  const tokens = [
    { label: 'USDC', value: 'USDC' },
    { label: 'USDT', value: 'USDT' },
    { label: 'ETH', value: 'ETH' },
    { label: 'BTC', value: 'BTC' },
  ]
  const [firstToken, setFirstToken] = useState(tokens[0])
  const [secondToken, setSecondToken] = useState(tokens[0])

  return (
    <div className="relative flex flex-col gap-3">
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
      <div
        className="absolute top-[40%] right-[42%] flex h-10 w-10 items-center justify-center rounded-full bg-primary hover:cursor-pointer"
        onClick={swap}
      >
        <HiArrowsUpDown size={20} />
      </div>
      <TokenSwapItem
        label={isLong ? 'Long' : 'Short'}
        value={0}
        tokenSelect={
          <Select
            items={tokens}
            selectedItem={secondToken}
            setSelectedItem={setSecondToken}
            style="no-style"
          />
        }
        secondaryText={''}
      />
    </div>
  )
}
export default TokenSwap
