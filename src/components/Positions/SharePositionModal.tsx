import { IoCloseOutline } from 'react-icons/io5'

import Modal from '../shared/Modal'
import Button from '../shared/Button'
import { HiOutlineLink } from 'react-icons/hi2'
import { FaDiscord, FaFacebookF, FaTwitter } from 'react-icons/fa'
import Image from 'next/image'
import { RiDownloadLine } from 'react-icons/ri'
import tokenIcon from '@/utils/getTokenIcon'
import { formatEther } from 'viem'
import formatNumber from '@/utils/formatNumber'

type SharePositionModalProps = {
  isOpen: boolean
  setIsOpen: (flag: boolean) => void
  position: IVXPositionType | GMXPosition
}

const SharePositionModal: React.FC<SharePositionModalProps> = ({
  isOpen,
  setIsOpen,
  position,
}) => {
  const link = 'https://ivx.fi/hk234/239hscj/2343cx33..'

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex w-100 flex-col items-start gap-3 rounded-lg bg-gray-600 p-5">
        <div className="flex w-full items-center justify-between text-gray-300">
          <h2 className="text-lg font-normal text-white">Share</h2>
          <IoCloseOutline size={24} onClick={() => setIsOpen(false)} />
        </div>
        <div className="flex w-full flex-col rounded-lg bg-gray-700 p-3">
          <div className="flex w-full justify-between">
            <Image alt="logo" src="/IVX_Gradient.svg" width={79} height={25} />
            <div className="cursor-pointer bg-gray-600 p-3 text-white">
              <RiDownloadLine size="24" />
            </div>
          </div>
          <div className="mt-4 flex w-full justify-between text-white">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <span>{position.strategy}</span>
                <span>{position.leverageStr}</span>
                <span className="flex items-center gap-1">
                  {tokenIcon(position.token, 18)}
                  {position.token.symbol}
                </span>
              </div>
              <h1 className="text-4xl font-semibold">
                {formatNumber(+formatEther(position.pnl) / 100, {
                  decimalCases: 2,
                  symbol: '%',
                  isSymbolEnd: true,
                })}
              </h1>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-start justify-end gap-1">
                  <h3 className="text-sm font-normal">Entry Price</h3>
                  <h2 className="text-xl font-semibold">
                    {formatNumber(+formatEther(position.entryPrice), {
                      decimalCases: 2,
                      symbol: '$',
                    })}
                  </h2>
                </div>
                <div className="flex flex-col items-start justify-end gap-1">
                  <h3 className="text-sm font-normal">Index Price</h3>
                  <h2 className="text-xl font-semibold">
                    {formatNumber(+formatEther(position.markPrice), {
                      decimalCases: 2,
                      symbol: '$',
                    })}
                  </h2>
                </div>
              </div>
            </div>
            <div className="mr-10 flex flex-col items-center justify-center gap-1 rounded-lg bg-white bg-opacity-20 px-2">
              <Image
                alt="logo"
                src="/ivx-qrcode.png"
                width={100}
                height={100}
              />
              <h3 className="text-sm font-semibold text-white">
                https://IVX.fi
              </h3>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 ">
          <div className="flex items-center justify-between rounded bg-gray-500 p-3">
            <h3 className="text-sm font-normal text-white">{link}</h3>
            <Button
              label="Copy link"
              leftIcon={<HiOutlineLink size={24} />}
              labelColor="dark"
            />
          </div>
          <p className="flex text-xs font-normal text-gray-300">Or Share via</p>
          <div className="flex items-start gap-3">
            <Button
              label="Twitter"
              leftIcon={<FaTwitter size={24} />}
              styleType="monochromatic"
            />
            <Button
              label="Discord"
              leftIcon={<FaDiscord size={24} />}
              styleType="monochromatic"
            />
            <Button
              label="Facebook"
              leftIcon={<FaFacebookF size={24} />}
              styleType="monochromatic"
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default SharePositionModal
