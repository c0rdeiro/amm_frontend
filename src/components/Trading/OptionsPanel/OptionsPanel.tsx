import DataTable from '@/components/shared/DataTable'
import { OptionType } from '@/types/next'
import OptionsHeader from './OptionsHeader'
import { createColumnHelper, Row } from '@tanstack/react-table'
import formatNumber from '@/utils/formatNumber'
import { useOptionsActions } from '@/store/optionsStore'
import { DataTableContentItem } from '@/components/shared/DataTableContentItem'

const OptionsPanel: React.FC = () => {
  const { setSelectedOption } = useOptionsActions()
  const data: OptionType[] = [
    {
      strike: 1100,
      breakEven: 1224.03,
      toBreakEven: 11.03,
      impliedVolatility: 79.5,
      price: 124.05,
      isSell: false,
      isCall: true,
      date: new Date(),
    },
    {
      strike: 1200,
      breakEven: 1250.43,
      toBreakEven: 37.43,
      impliedVolatility: 70.2,
      price: 50.43,
      isSell: false,
      isCall: true,
      date: new Date(),
    },

    {
      strike: 1300,
      breakEven: 1313.46,
      toBreakEven: 100.46,
      impliedVolatility: 68.1,
      price: 13.46,
      isSell: false,
      isCall: true,
      date: new Date(),
    },

    {
      strike: 1400,
      breakEven: 1403.48,
      toBreakEven: 190.48,
      impliedVolatility: 73.6,
      price: 3.48,
      isSell: false,
      isCall: true,
      date: new Date(),
    },
  ]
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
        data={data}
        columns={columns}
        rowClickAction={(row: Row<OptionType>) =>
          setSelectedOption(row.original)
        }
      />
    </div>
  )
}

export default OptionsPanel
