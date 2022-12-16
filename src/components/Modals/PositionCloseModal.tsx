import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'
import { useToken } from '@/store/tokenStore'
import tokenIcon from '@/hooks/tokenIcon'
import formatDateTime from '@/utils/formatDateTime'
import { PositionType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'

type PositionCloseModalProps = {
  isOpen: boolean
  setIsOpen: (x: boolean) => void
  position: PositionType
}
const PositionCloseModal: React.FC<PositionCloseModalProps> = ({
  isOpen,
  setIsOpen,
  position,
}) => {
  const closeModal = () => setIsOpen(false)
  const token = useToken()
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-select bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex w-full max-w-xl transform flex-col items-center gap-12 overflow-hidden rounded-4xl bg-white px-2.5 py-14 align-middle shadow-drawer transition-all">
                <Image
                  alt="logo"
                  src="/Brand.svg"
                  width={94.12}
                  height={40}
                  quality={100}
                />
                <div className="flex flex-col items-center gap-4">
                  {tokenIcon(token.label, 56)}
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-2.5xl font-semibold ">{token.label}</h3>
                    <p className="text-text-purple">
                      Opened at{' '}
                      {position.openDate
                        ? formatDateTime(position.openDate, { hideYear: false })
                        : undefined}
                    </p>
                  </div>
                </div>
                <div className="isolate flex flex-col items-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-start gap-2.5 rounded-7xl bg-green px-8 py-4">
                      <p className="text-2.5xl font-bold text-white">
                        {formatNumber(position.profit, {
                          decimalCases: 2,
                          symbol: '%',
                          isSymbolEnd: true,
                          displayPositive: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default PositionCloseModal
