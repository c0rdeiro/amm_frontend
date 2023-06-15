import { TabType } from '@/types/next'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import GMXTrader from './GMX/GMXTrader'
import IVXTrader from './IVX/IVXTrader'
import FolderTabs from './FolderTabs'

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState(0)
  const tabs: TabType[] = [
    {
      key: 0,
      label: '',
      rightIcon: (
        <Image
          alt="ivx-logo"
          src="/IVX_Gradient.svg"
          width={68}
          height={23}
          quality={100}
        />
      ),
      action: () => {
        setActiveTab(0)
        localStorage.setItem('tab', '0')
      },
    },
    {
      key: 1,
      label: '',
      rightIcon: (
        <Image
          alt="gmx-logo"
          src="/gmx_logo.svg"
          width={63}
          height={15}
          quality={100}
        />
      ),
      action: () => {
        setActiveTab(1)
        localStorage.setItem('tab', '1')
      },
    },
  ]

  useEffect(() => {
    if (localStorage.getItem('tab'))
      setActiveTab(+localStorage.getItem('tab')!!)
  }, [])

  const getOptionTab = () => {
    switch (activeTab) {
      case 1:
        return <GMXTrader />
      case 0:
      default:
        return <IVXTrader />
    }
  }
  return (
    <div className="mx-5 flex h-min min-w-82 flex-col font-medium">
      <FolderTabs tabList={tabs} defaultIndex={activeTab} />
      <div>{getOptionTab()}</div>
    </div>
  )
}

export default RightPanel
