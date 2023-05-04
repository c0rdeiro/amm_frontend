import AVAXIcon from '@/Icons/tokens/avax'
import BNBIcon from '@/Icons/tokens/bnb'
import BTCIcon from '@/Icons/tokens/btc'
import ETHIcon from '@/Icons/tokens/eth'
import LINKIcon from '@/Icons/tokens/link'
import { Market } from '@/types/next'

export default function tokenIcon(
  market: Market,
  size: number
): React.ReactNode {
  switch (market?.value.toLowerCase()) {
    case 'eth':
    case 'ethusdt':
      return <ETHIcon size={size} />
    case 'btc':
    case 'btcusdt':
      return <BTCIcon size={size} />
    case 'avax':
      return <AVAXIcon size={size} />
    case 'bnb':
      return <BNBIcon size={size} />

    case 'link':
      return <LINKIcon size={size} />
    default:
      return
  }
}
