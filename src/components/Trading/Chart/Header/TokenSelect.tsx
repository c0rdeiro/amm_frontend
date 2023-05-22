import Select from '@/components/shared/Form/Select'
import Spinner from '@/components/shared/Spinner'
import BTCIcon from '@/Icons/tokens/btc'
import ETHIcon from '@/Icons/tokens/eth'
import { useMarket, useTokenActions } from '@/store/tokenStore'
import { Market } from '@/types/next'
import { useRouter } from 'next/router'
import { Suspense } from 'react'

import TokenPrice from './TokenPrice'
import getTokenIcon from '@/utils/getTokenIcon'

const TokenSelect: React.FC = () => {
  const { setMarket: setMarket } = useTokenActions()
  const { push } = useRouter()
  const market = useMarket()

  const markets: {
    label: string
    value: Market
    icon: JSX.Element
  }[] = [
    {
      label: 'ETH / USDT',
      value: { label: 'ETH USDT', symbol: 'ETHUSDT' },
      icon: <ETHIcon size={18} />,
    },
    {
      label: 'BTC / USDT',
      value: { label: 'BTC USDT', symbol: 'BTCUSDT' },
      icon: <BTCIcon size={18} />,
    },
  ]

  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-row items-center gap-4">
        {market ? getTokenIcon(market, 36) : undefined}
        <Select
          items={markets}
          selectedItem={markets.find((x) => x.value.symbol === market.symbol)}
          setSelectedItem={(market: { label: string; value: Market }) => {
            setMarket(market.value)
            push(`/trading/${market.value.symbol.toLowerCase()}`)
          }}
          fontSize="lg"
          style="no-style"
          textColor="white"
        />

        <TokenPrice />
      </div>
    </Suspense>
  )
}

export default TokenSelect
