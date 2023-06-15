import { IoCloseOutline, IoCopy } from 'react-icons/io5'
import Modal from '../shared/Modal'
import Image from 'next/image'
import { DropdownMenuItem } from '../shared/DropdownMenu'
import { MenuLinkType } from '@/types/next'
import CustomNetworkButton from '../shared/CustomNetworkButton'
import { useAccount, useDisconnect } from 'wagmi'
import { RxExit } from 'react-icons/rx'
import { toast } from 'react-toastify'

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
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const copyAddressToClipboard = () => {
    if (address) navigator.clipboard.writeText(address)
    toast('Copied.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

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
        {address && (
          <div
            className="flex items-center gap-2 rounded bg-gray-500 py-2 px-3 text-gray-300"
            onClick={copyAddressToClipboard}
          >
            <span className="text-sm text-white">{`${address?.slice(
              0,
              address.length / 2
            )}...${address?.slice(address.length / 2 + 5)}`}</span>
            <IoCopy size={24} />
          </div>
        )}
        <div className="flex w-full flex-col items-start gap-2">
          {address && (
            <h4 className="text-sm font-medium text-white">Network</h4>
          )}
          <CustomNetworkButton
            showAddress={false}
            networkDisplay="full"
            networkBtnSize="lg"
          />
        </div>
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
          {address && (
            <div
              className="flex items-center gap-3 py-4 px-2 text-lg font-medium text-gray-300"
              onClick={() => disconnect()}
            >
              <RxExit />
              <span>Disconnect</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
export default HeaderOptions
