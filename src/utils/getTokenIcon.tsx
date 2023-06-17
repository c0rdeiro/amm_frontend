import BTCIcon from '@/Icons/tokens/btc'
import ETHIcon from '@/Icons/tokens/eth'
import { Market } from '@/types/next'

export default function tokenIcon(
  entry: Market | GMXToken,
  size: number
): React.ReactNode {
  switch (entry.symbol?.toLowerCase()) {
    case 'eth':
    case 'ethusdt':
      return <ETHIcon size={size} />
    case 'btc':
    case 'btcusdt':
      return <BTCIcon size={size} />
    default:
      return
  }
}
