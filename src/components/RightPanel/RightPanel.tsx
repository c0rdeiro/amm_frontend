import { PositionType, TabType } from '@/types/next'
import Tabs from '../shared/Tabs'
import OptionsExchange from './OptionsExchange'
import PositionRightPanel from './PositionRightPanel'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import GMXTrader from './GMXTrader'

type RightPanelProps = {
  position?: PositionType | undefined
  isOption: boolean
}

const RightPanel: React.FC<RightPanelProps> = ({ isOption, position }) => {
  const [activeTab, setActiveTab] = useState(0)
  const tabs: TabType[] = [
    {
      key: 0,
      label: '',
      icon: (
        <Image
          alt="ivx-logo"
          src="/IVX_Gradient.svg"
          width={50}
          height={9}
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
      icon: (
        <Image
          alt="gmx-logo"
          src="/gmx_logo.svg"
          width={25}
          height={5}
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
      case 0:
        return <OptionsExchange />
      case 1:
        return <GMXTrader />
      default:
        return <OptionsExchange />
    }
  }
  return (
    <div className="rounded-0 flex min-h-full w-rightPanel flex-col border-4 border-gray-400 font-medium dark:border-headerDark">
      {isOption && (
        <Tabs
          tabList={tabs}
          style="monochromatic"
          size="sm"
          roundStyle="straight"
          defaultIndex={activeTab}
        />
      )}
      <div className="item-center px-13  flex  flex-col gap-4  p-1 px-6 pt-8 ">
        {/*  default no options selected */}
        {isOption
          ? getOptionTab()
          : position && <PositionRightPanel position={position} />}
      </div>
    </div>
  )
}

export default RightPanel
