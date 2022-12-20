import DataTable from '@/components/shared/DataTable'
import { OptionType } from '@/types/next'
import OptionsHeader from './OptionsHeader'
import { createColumnHelper, Row } from '@tanstack/react-table'
import formatNumber from '@/utils/formatNumber'
import {
  useIsOptionCall,
  useOptionExpDate,
  useIsOptionSell,
  useOptionsActions,
} from '@/store/optionsStore'
import { DataTableContentItem } from '@/components/shared/DataTableContentItem'
import { useQuery } from '@tanstack/react-query'
import { getTokenOptions } from '@/lib/getTokenOptions'
import { useToken } from '@/store/tokenStore'

const OptionsPanel: React.FC = () => {
  const { setSelectedOption } = useOptionsActions()

  const token = useToken()
  const expDate = useOptionExpDate()
  const isCall = useIsOptionCall()
  const isSell = useIsOptionSell()

  const { data } = useQuery({
    queryKey: ['options', token.symbol, expDate, isCall, isSell],
    queryFn: () =>
      getTokenOptions(
        token.symbol,
        expDate ? +expDate.value : 0,
        isCall,
        isSell
      ),
    enabled: !!expDate,
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
        data={data ?? []}
        columns={columns}
        rowClickAction={(row: Row<OptionType>) =>
          setSelectedOption(row.original)
        }
      />
    </div>
  )
}

export default OptionsPanel
