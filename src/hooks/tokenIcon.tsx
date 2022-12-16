import AVAXIcon from '@/Icons/tokens/avax'
import BNBIcon from '@/Icons/tokens/bnb'
import BTCIcon from '@/Icons/tokens/btc'
import ETHIcon from '@/Icons/tokens/eth'
import LINKIcon from '@/Icons/tokens/link'

export default function tokenIcon(
  token: string,
  size: number
): React.ReactNode {
  switch (token.toLowerCase()) {
    case 'eth':
      return <ETHIcon size={size} />

    case 'btc':
      return <BTCIcon size={size} />
    case 'avax':
      return <AVAXIcon size={size} />
    case 'bnb':
      return <BNBIcon size={size} />

    case 'link':
      return <LINKIcon size={size} />
    default:
      break
  }
}
