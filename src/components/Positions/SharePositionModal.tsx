import formatNumber from '@/utils/formatNumber'
import tokenIcon from '@/utils/getTokenIcon'
import { toBlob, toJpeg } from 'html-to-image'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import { HiOutlineLink } from 'react-icons/hi2'
import { IoCloseOutline, IoCopy } from 'react-icons/io5'
import { RiDownloadLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { formatEther } from 'viem'

import Button from '../shared/Button'
import Modal from '../shared/Modal'

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
  const link =
    'https://asset.cloudinary.com/ddroubfyo/84aa33513172059ca28a17fffb3b85ea'
  const IVX_LINK = 'https://ivx.fi'

  const ref = useRef<HTMLDivElement>(null)

  const filter = (node: HTMLElement) => {
    const exclusionClasses = ['remove']
    return !exclusionClasses.some((classname) =>
      node.classList?.contains(classname)
    )
  }

  const onDownloadImage = useCallback(async () => {
    if (ref.current === null) {
      return
    }

    await toJpeg(ref.current, { filter })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'position.png'
        link.href = dataUrl
        console.log(dataUrl)

        navigator.clipboard.writeText(dataUrl)
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  const onCopyImageToClipboard = async () => {
    if (ref.current === null) {
      return
    }

    const image = await toBlob(ref.current, { filter })
    if (image) {
      navigator.clipboard.write([new ClipboardItem({ [image.type]: image })])
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
  }

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(link)
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
      <div className="flex w-96 flex-col items-start gap-3 rounded-lg bg-gray-600 p-5 md:w-100">
        <div className="flex w-full items-center justify-between text-gray-300">
          <h2 className="text-lg font-normal text-white">Share</h2>
          <span className="cursor-pointer">
            <IoCloseOutline size={24} onClick={() => setIsOpen(false)} />
          </span>
        </div>
        <div
          className="flex w-full flex-col rounded-lg bg-[url('/share-modal-bg.png')] bg-cover p-3"
          ref={ref}
        >
          <div className="flex w-full justify-between">
            <Image alt="logo" src="/IVX_Gradient.svg" width={79} height={25} />
            <div
              className="remove cursor-pointer rounded bg-gray-600 p-3 text-white"
              onClick={onDownloadImage}
            >
              <RiDownloadLine size="24" />
            </div>
          </div>
          <div className="mt-4 flex w-full flex-col justify-between gap-10 text-white md:flex-row">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <span>{position.strategy}</span>
                <span>{position.leverageStr}</span>
                <span className="flex items-center gap-1">
                  {tokenIcon(position.token, 18)}
                  {position.token.symbol}
                </span>
              </div>
              <h1 className="flex text-4xl font-semibold">
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
            <div className="mr-10 flex w-min flex-col items-center justify-center gap-1 rounded-lg bg-white bg-opacity-20 px-2">
              <Image
                alt="logo"
                src="/ivx-qrcode.png"
                width={100}
                height={100}
              />
              <h3 className="text-sm font-semibold text-white">{IVX_LINK}</h3>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 ">
          <div className="flex items-center justify-between rounded bg-gray-500 p-3">
            <h3
              className="text-sm font-normal text-white"
              onClick={onCopyToClipboard}
            >
              {link}
            </h3>
            <Button
              label="Copy link"
              leftIcon={<HiOutlineLink size={24} />}
              labelColor="dark"
              size="sm"
              onClick={onCopyToClipboard}
            />
          </div>
          <p className="flex text-xs font-normal text-gray-300">Or Share via</p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start">
            <Link
              href={`https://twitter.com/intent/tweet?url=${link}`}
              className="twitter-share-button flex items-center justify-center gap-2 rounded bg-gray-500 p-3 text-sm font-normal text-white"
              target="__blank"
            >
              <FaTwitter size={24} /> Twitter
            </Link>
            <Link
              href={`#`}
              className="flex items-center justify-center gap-2 rounded bg-gray-500 p-3 text-sm font-normal text-white"
              target="__blank"
            >
              <FaDiscord size={24} /> Discord
            </Link>
            <div
              onClick={onCopyImageToClipboard}
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-gray-500 p-3 text-sm font-normal text-white"
            >
              <IoCopy size={24} /> <span>Copy Image</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default SharePositionModal
