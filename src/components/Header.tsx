import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header: React.FC = () => {
  return (
    <div className="z-50 flex h-16 w-full flex-none items-center justify-between gap-2.5 bg-gray-100 pr-24 pl-16 shadow-header">
      <Image
        alt="logo"
        src="/Brand.svg"
        width={94.12}
        height={40}
        quality={100}
      />
      {/* <div className="font-medium text-text-purple">Wallet</div> */}
      <ConnectButton />
    </div>
  )
}

export default Header
