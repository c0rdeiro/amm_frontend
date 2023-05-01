import Select from '@/components/shared/Form/Select'
import Spinner from '@/components/shared/Spinner'
import tokenIcon from '@/hooks/tokenIcon'
import BTCIcon from '@/Icons/tokens/btc'
import ETHIcon from '@/Icons/tokens/eth'
import { useMarket, useTokenActions } from '@/store/tokenStore'
import { Market } from '@/types/next'
import { useRouter } from 'next/router'
import { Suspense } from 'react'

import TokenPrice from './TokenPrice'

const TokenSelect: React.FC = () => {
  const { setMarket: setMarket } = useTokenActions()
  const { push } = useRouter()
  const market = useMarket()

  const markets: Market[] = [
    {
      value: 'ETHUSDT',
      label: 'ETH / USDT',
      icon: <ETHIcon size={18} />,
    },
    {
      value: 'BTCUSDT',
      label: 'BTC / USDT',
      icon: <BTCIcon size={18} />,
    },
  ]
  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-row items-center gap-4">
        {market ? tokenIcon(market, 36) : undefined}
        <Select
          items={markets}
          selectedItem={market}
          setSelectedItem={(market: Market) => {
            setMarket(market)
            push(`/trading/${market.value.toLowerCase()}`)
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
