import Image from 'next/image'

import CustomConnectButton from './CustomConnectButton'
import { MenuLinkType } from '@/types/next'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import DropDownMenu, { DropdownMenuItem } from './shared/DropdownMenu'
import { HiDotsHorizontal } from 'react-icons/hi'
import DocsIcon from '@/Icons/docs'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import HeaderOptionsModal from './Modals/HeaderOptionsModal'

const Header: React.FC = () => {
  const headerLinks: MenuLinkType[] = [
    {
      label: 'Trade',
      link: '/trading',
    },
    {
      label: 'Earn',
      link: '/earn',
    },
  ]

  const additionalLinks: DropdownMenuItem[] = [
    {
      label: 'Docs',
      link: 'https://docs.ivx.fi/',
      icon: <DocsIcon />,
      newTab: true,
    },
    {
      label: 'Github',
      link: 'https://github.com/IVX-FI',
      icon: <FaGithub />,
      newTab: true,
    },
    {
      label: 'Discord',
      link: 'https://discord.com/invite/ivx',
      icon: <FaDiscord />,
      newTab: true,
    },
    {
      label: 'Twitter',
      link: 'https://twitter.com/ivx_fi',
      icon: <FaTwitter />,
      newTab: true,
    },
  ]

  const { asPath } = useRouter()

  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="z-50 flex h-16 w-full flex-none items-center justify-between gap-2.5 bg-gray-700 px-6 py-5 ">
        <div className="flex items-center">
          <div className="my-2 mr-10">
            <Image
              alt="logo"
              src="/IVX_Gradient.svg"
              width={116.61}
              height={37}
              quality={100}
            />
          </div>
          <div className="hidden cursor-pointer items-center gap-6 text-white md:flex">
            {headerLinks.map((item) => (
              <div
                key={item.link}
                className={clsx('text-gray-300 hover:text-white', {
                  'text-white': `/${asPath.split('/')[1]}` === item.link,
                })}
              >
                {item.label}
              </div>
            ))}
            <DropDownMenu
              title={
                <div className="rounded py-1 px-2 text-gray-300 hover:bg-gray-500 ">
                  <HiDotsHorizontal size={24} />
                </div>
              }
              items={additionalLinks}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden gap-5 md:flex">
            <div className="flex flex-col items-end">
              <span className="text-sm font-normal text-gray-300">
                Net Worth
              </span>
              <span className="font-bold text-white ">$364k</span>
            </div>
            <div className="h-9 border border-gray-200 opacity-75" />
          </span>
          <CustomConnectButton />
          <span className="cursor-pointer md:hidden">
            <GiHamburgerMenu
              color="white"
              size={24}
              onClick={() => setModalOpen(true)}
            />
          </span>
        </div>
      </div>
      <HeaderOptionsModal
        isOpen={isModalOpen}
        setIsOpen={setModalOpen}
        additionalLinks={additionalLinks}
        links={headerLinks}
      />
    </>
  )
}

export default Header
