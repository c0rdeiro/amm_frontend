import Select from '@/components/shared/Form/Select'
import Tabs from '@/components/shared/Tabs'
import { useOptionsActions } from '@/store/optionsStore'
import { TabType } from '@/types/next'
import { useState } from 'react'
import { HiOutlineArrowDownTray, HiOutlineArrowUpTray } from 'react-icons/hi2'
import { IoTrendingUpSharp, IoTrendingDownSharp } from 'react-icons/io5'

const OptionsHeader: React.FC = () => {
  const dates: { label: string }[] = [{ label: 'Exp Nov 4, 5am' }]
  const [filterDate, setFilterDate] = useState<{ label: string }>(dates[0]!)
  const { setIsCall, setIsSell } = useOptionsActions()
  //TODO: type actions
  const buyOrSellTabs: TabType[] = [
    {
      label: 'Buy',
      icon: <HiOutlineArrowDownTray size="1.125rem" />,
      action: () => {
        setIsSell(false)
      },
    },
    {
      label: 'Sell',
      icon: <HiOutlineArrowUpTray size="1.125rem" />,
      action: () => {
        setIsSell(true)
      },
    },
  ]

  const callOrPutTabs: TabType[] = [
    {
      label: 'Call',

      icon: <IoTrendingUpSharp size="1.125rem" />,
      action: () => {
        setIsCall(true)
      },
    },
    {
      label: 'Put',
      icon: <IoTrendingDownSharp size="1.125rem" />,
      action: () => {
        setIsCall(false)
      },
    },
  ]

  return (
    <div className="flex w-full items-start justify-between gap-6 px-6">
      <div className="flex items-start gap-6">
        <Tabs tabList={buyOrSellTabs} />
        <Tabs tabList={callOrPutTabs} />
      </div>
      <Select
        selectedItem={filterDate}
        setSelectedItem={() => setFilterDate}
        items={dates}
      />
    </div>
  )
}

export default OptionsHeader
