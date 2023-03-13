import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header: React.FC = () => {
  return (
    <div className="z-50 flex h-16 w-full flex-none items-center justify-between gap-2.5 bg-gray-100 pr-24 pl-16 shadow-header">
      <Image
        alt="logo"
        src="/IVX_Gradient.svg"
        width={94.12}
        height={20}
        quality={100}
      />
      <ConnectButton showBalance={false} />
    </div>
  )
}

export default Header
