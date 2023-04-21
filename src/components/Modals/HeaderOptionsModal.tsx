import { IoCloseOutline } from 'react-icons/io5'
import Modal from '../shared/Modal'
import Image from 'next/image'
import { DropdownMenuItem } from '../shared/DropdownMenu'
import { MenuLinkType } from '@/types/next'
import CustomConnectButton from '../CustomConnectButton'

type HeaderOptionsProps = {
  isOpen: boolean
  setIsOpen: (flag: boolean) => void
  links: MenuLinkType[]
  additionalLinks: DropdownMenuItem[]
}
const HeaderOptions: React.FC<HeaderOptionsProps> = ({
  isOpen,
  setIsOpen,
  links,
  additionalLinks,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex h-screen w-full flex-col gap-5 bg-gray-700 ring-8 ring-gray-700">
        <div className="flex items-center justify-between">
          <Image
            alt="logo"
            src="/IVX_Gradient.svg"
            width={116.61}
            height={37}
            quality={100}
          />
          <IoCloseOutline
            color="white"
            size={24}
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-normal text-gray-300">Net Worth</span>
          <span className="text-2xl font-bold text-white">$364k</span>
        </div>
        <CustomConnectButton />
        <span className="w-full border border-gray-500" />
        <div className="flex flex-col items-start">
          {links.map((item) => (
            <div
              key={item.link}
              className="py-4 px-2 text-lg font-medium text-white"
            >
              {item.label}
            </div>
          ))}
          {additionalLinks.map((item) => (
            <div
              key={item.link}
              className="flex items-center gap-3 py-4 px-2 text-lg font-medium text-white"
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
export default HeaderOptions
