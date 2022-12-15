import Image from 'next/image'

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
      <div className="font-medium text-text-purple">Wallet</div>
    </div>
  )
}

export default Header
