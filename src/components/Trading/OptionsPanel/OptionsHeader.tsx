import Select, { SelectItem } from '@/components/shared/Form/Select'
import Tabs from '@/components/shared/Tabs'
import { getTokenOptionsExpiries } from '@/lib/getTokenOptionsExpiries'
import { useOptionExpDate, useOptionsActions } from '@/store/optionsStore'
import { useToken } from '@/store/tokenStore'
import { TabType } from '@/types/next'
import formatDateTime from '@/utils/formatDateTime'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { HiOutlineArrowDownTray, HiOutlineArrowUpTray } from 'react-icons/hi2'
import { IoTrendingUpSharp, IoTrendingDownSharp } from 'react-icons/io5'

const OptionsHeader: React.FC = () => {
  const token = useToken()
  const filterDate = useOptionExpDate()
  const { data: expiries } = useQuery({
    queryKey: ['expiries', token.symbol],
    queryFn: () => getTokenOptionsExpiries(token.symbol),
  })

  useEffect(() => {
    if (!filterDate && expiries?.length) {
      setExpDate({
        value: expiries[0]!,
        label: `Exp ${formatDateTime(new Date(+expiries[0]!), {
          hideHours: false,
          hideMinutes: false,
        })}`,
      })
    }
  }, [expiries])

  const dates: SelectItem[] =
    expiries?.map((item) => ({
      value: item,
      label: `Exp ${formatDateTime(new Date(+item), {
        hideHours: false,
        hideMinutes: false,
      })}`,
    })) ?? []
  // const [filterDate, setFilterDate] = useState<SelectItem | undefined>(dates[0])
  const { setIsCall, setIsSell, setExpDate } = useOptionsActions()
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
        setSelectedItem={setExpDate}
        items={dates}
      />
    </div>
  )
}

export default OptionsHeader
