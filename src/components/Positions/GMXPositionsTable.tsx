import formatNumber from '@/utils/formatNumber'
import { createColumnHelper } from '@tanstack/react-table'

import { DataTableContentItem } from '../shared/DataTableContentItem'
import DataTable from '../shared/DataTable'
import clsx from 'clsx'

type GMXPositionsTableProps = {
  data: GMXPosition[]
  showTableHeader?: boolean
}
const GMXPositionsTable: React.FC<GMXPositionsTableProps> = ({
  data,
  showTableHeader = true,
}) => {
  const showPnlAfterFees = false //TODO

  const columnHelper = createColumnHelper<GMXPosition>()
  const columns = [
    columnHelper.accessor('indexToken', {
      id: 'indexToken',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <div className="flex flex-col">
            <span>{info.getValue().symbol}</span>
            <span>
              {info.row.original.leverageStr}
              <span
                className={clsx('ml-1', {
                  'text-green-400': info.row.original.isLong,
                  'text-red-400': !info.row.original.isLong,
                })}
              >
                {info.row.original.isLong ? 'Long' : 'Short'}
              </span>
            </span>
          </div>
        </DataTableContentItem>
      ),
      header: () => <span>Position</span>,
    }),
    columnHelper.accessor('netValue', {
      id: 'netValue',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <div className="flex flex-col">
            {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
            <span
              className={clsx({
                'text-green-400':
                  info.row.original[
                    showPnlAfterFees ? 'hasProfitAfterFees' : 'hasProfit'
                  ] &&
                  info.row.original[
                    showPnlAfterFees ? 'pendingDeltaAfterFees' : 'pendingDelta'
                  ].gt(0),
                'text-red-400':
                  !info.row.original[
                    showPnlAfterFees ? 'hasProfitAfterFees' : 'hasProfit'
                  ] &&
                  info.row.original[
                    showPnlAfterFees ? 'pendingDeltaAfterFees' : 'pendingDelta'
                  ].gt(0),
              })}
            >
              {info.row.original.deltaStr} (
              {info.row.original.deltaPercentageStr})
            </span>
          </div>
        </DataTableContentItem>
      ),
      header: () => <span>Net Value</span>,
    }),
    columnHelper.accessor('size', {
      id: 'size',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Size</span>,
    }),

    columnHelper.accessor('collateral', {
      id: 'collateral',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Collateral</span>,
    }),

    columnHelper.accessor('entryPrice', {
      id: 'entryPrice',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Entry Price</span>,
    }),

    columnHelper.accessor('markPrice', {
      id: 'markPrice',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Mark Price</span>,
    }),
    columnHelper.accessor('liqPrice', {
      id: 'liqPrice',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Liq. Price</span>,
    }),
  ]

  return (
    <DataTable
      colorScheme="white"
      data={data}
      columns={columns}
      showHeader={showTableHeader}
    />
  )
}
export default GMXPositionsTable
