import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ThemeSwitch from './ThemeSwitch'
import CustomConnectButton from './CustomConnectButton'

const Header: React.FC = () => {
  return (
    <div className="z-50 flex h-16 w-full flex-none items-center justify-between gap-2.5 bg-headerDark pr-8 pl-16  ">
      <Image
        alt="logo"
        src="/IVX_Gradient.svg"
        width={94.12}
        height={20}
        quality={100}
      />
      <div className="flex gap-8">
        <CustomConnectButton />
        <ThemeSwitch />
      </div>
    </div>
  )
}

export default Header
