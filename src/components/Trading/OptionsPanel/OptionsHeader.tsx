import Select, { SelectItem } from '@/components/shared/Form/Select'
import Tabs from '@/components/shared/Tabs'
import { getTokenOptionsExpiries } from '@/lib/getTokenOptionsExpiries'
import { useOptionExpDate, useOptionsActions } from '@/store/optionsStore'
import { TabType } from '@/types/next'
import formatDateTime from '@/utils/formatDateTime'
import lyra from '@/utils/getLyraSdk'
import { BigNumber } from '@ethersproject/bignumber'
import { Board, BoardQuotes, Quote, StrikeQuotes } from '@lyrafinance/lyra-js'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { HiOutlineArrowDownTray, HiOutlineArrowUpTray } from 'react-icons/hi2'
import { IoTrendingUpSharp, IoTrendingDownSharp } from 'react-icons/io5'

const OptionsHeader: React.FC = () => {
  const filterDate = useOptionExpDate()
  const { setIsCall, setIsSell, setExpDate } = useOptionsActions()

  const router = useRouter()
  const tokenSymbol = router.asPath.split('/').pop()

  const { data: market } = useQuery({
    queryKey: ['market'],
    queryFn: async () =>
      await lyra.market('0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'), //TODO: change::::this should be a constant
  })

  useEffect(() => {
    const firstBoard: Board | undefined = market?.liveBoards()[0]

    if (!filterDate && firstBoard) {
      setExpDate({
        value: firstBoard.quoteAllSync(
          BigNumber.from(1).mul(BigNumber.from(10).pow(18)),
          {
            iterations: 3,
          }
        ),
        label: `Exp ${formatDateTime(
          new Date(firstBoard.expiryTimestamp * 1000),
          {
            hideHours: false,
            hideMinutes: false,
          }
        )}`,
      })
    }
  }, [market])

  const dates: SelectItem<BoardQuotes>[] =
    market?.liveBoards().map((board: Board) => ({
      value: board.quoteAllSync(
        BigNumber.from(1).mul(BigNumber.from(10).pow(18)),
        {
          iterations: 3,
        }
      ),
      label: `Exp ${formatDateTime(new Date(board.expiryTimestamp * 1000), {
        hideHours: false,
        hideMinutes: false,
      })}`,
    })) ?? []

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
