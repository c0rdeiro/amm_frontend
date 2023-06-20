import BTCIcon from '@/Icons/tokens/btc'
import ETHIcon from '@/Icons/tokens/eth'
import USDTIcon from '@/Icons/tokens/usdt'
import { Token } from '@/constants'
import { Market } from '@/types/next'

export default function tokenIcon(
  entry: Market | GMXToken | Token,
  size: number
): React.ReactNode {
  switch (entry.symbol?.toLowerCase()) {
    case 'eth':
    case 'ethusdt':
      return <ETHIcon size={size} />
    case 'btc':
    case 'btcusdt':
      return <BTCIcon size={size} />
    case 'usdt':
      return <USDTIcon size={size} />
    case 'usdc':
      return <USDTIcon size={size} />
    default:
      return
  }
}
