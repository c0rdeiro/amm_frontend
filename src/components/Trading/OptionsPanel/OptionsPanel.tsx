import DataTable from '@/components/shared/DataTable'
import { DataTableContentItem } from '@/components/shared/DataTableContentItem'
import { getTokenOptions } from '@/lib/getTokenOptions'
import {
  useIsOptionCall,
  useIsOptionSell,
  useOptionExpDate,
  useOptionsActions,
} from '@/store/optionsStore'
import { OptionType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import lyra from '@/utils/getLyraSdk'
import { useQuery } from '@tanstack/react-query'
import { createColumnHelper, Row } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import OptionsHeader from './OptionsHeader'

const OptionsPanel: React.FC = () => {
  const { setSelectedOption } = useOptionsActions()

  const expDate = useOptionExpDate()
  const isCall = useIsOptionCall()
  const isSell = useIsOptionSell()

  const router = useRouter()
  const tokenSymbol = router.asPath.split('/').pop()

  const { data: market } = useQuery({
    queryKey: ['market', '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'],
    queryFn: async () =>
      await lyra.market('0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'), //TODO: change::::this should be a constant
    refetchInterval: 10000,
  })

  const { data } = useQuery({
    queryKey: ['options', tokenSymbol, expDate?.value.board.expiryTimestamp],
    queryFn: () =>
      getTokenOptions(tokenSymbol, market, expDate?.value, isCall, isSell),
    enabled: !!expDate && !!tokenSymbol && !!market,
    keepPreviousData: true,
  })

  const columnHelper = createColumnHelper<OptionType>()
  const columns = [
    columnHelper.accessor('strike', {
      id: 'strike',
      cell: (info) => (
        <DataTableContentItem clickType="select" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Strike</span>,
    }),
    columnHelper.accessor('breakEven', {
      id: 'breakEven',
      cell: (info) => (
        <DataTableContentItem clickType="select" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Break Even</span>,
    }),
    columnHelper.accessor('toBreakEven', {
      id: 'toBreakEven',
      cell: (info) => (
        <DataTableContentItem clickType="select" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>To Break Even</span>,
    }),
    columnHelper.accessor('impliedVolatility', {
      id: 'impliedVolatility',
      cell: (info) => (
        <DataTableContentItem clickType="select" row={info.row}>
          {formatNumber(info.getValue(), {
            decimalCases: 1,
            symbol: '%',
            isSymbolEnd: true,
          })}
        </DataTableContentItem>
      ),
      header: () => <span>Implied Volatility</span>,
    }),
    columnHelper.accessor('price', {
      id: 'price',
      cell: (info) => (
        <DataTableContentItem clickType="select" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Price</span>,
    }),
  ]
  return (
    <div className="flex flex-col items-start gap-6 rounded-lg bg-white px-6 py-8 shadow-dark">
      <OptionsHeader />

      <DataTable
        data={data ?? [{} as OptionType]}
        columns={columns}
        rowClickAction={(row: Row<OptionType>) =>
          setSelectedOption(row.original)
        }
      />
    </div>
  )
}

export default OptionsPanel
