import { Order } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import getIconFancyIcon from '@/utils/getIconFancyIcon'
import { createColumnHelper, SortingState } from '@tanstack/react-table'
import clsx from 'clsx'
import { useState } from 'react'
import { HiShare } from 'react-icons/hi2'
import {
  IoCloseOutline,
  IoTrendingDownSharp,
  IoTrendingUpSharp,
} from 'react-icons/io5'

import DataTable from '../shared/DataTable'
import { DataTableContentItem } from '../shared/DataTableContentItem'

type OrdersTableProps = {
  data: Order[]
}
const OrdersTable: React.FC<OrdersTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const columnHelper = createColumnHelper<Order>()
  const columns = [
    columnHelper.accessor('token', {
      id: 'indexToken',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <div className="flex items-center gap-1 text-sm">
            {getIconFancyIcon(info.getValue())}
            <span
              className={clsx(
                'flex items-center justify-center gap-2 rounded px-2 py-1',
                {
                  'bg-[#0dac8626]': info.row.original.strategy === 'Long',
                  'bg-[#e3575926]]': info.row.original.strategy === 'Short',
                }
              )}
            >
              <span
                className={clsx({
                  'text-green-400': info.row.original.strategy === 'Long',
                  'text-red-400': info.row.original.strategy === 'Short',
                })}
              >
                {info.row.original.strategy === 'Long' ? (
                  <IoTrendingUpSharp size={16} />
                ) : (
                  <IoTrendingDownSharp size={16} />
                )}
              </span>
              {info.row.original.strategy}
            </span>

            <span>Increase by {formatNumber(info.row.original.n)}</span>
          </div>
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Position</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('type', {
      id: 'type',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {info.getValue()}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Type</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('price', {
      id: 'price',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {info.row.original.priceAbove ? '>' : '<'}
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Price</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('markPrice', {
      id: 'markPrice',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Mark Price</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('id', {
      id: 'close',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <button className="flex cursor-pointer items-center gap-1 rounded bg-gray-500 p-2 text-sm font-normal text-white transition duration-200 hover:bg-red-400">
            <IoCloseOutline size={16} />
            Close
          </button>
        </DataTableContentItem>
      ),
      header: () => <span></span>,
      enableSorting: false,
    }),
    columnHelper.accessor('id', {
      id: 'share',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <span className="cursor-pointer text-gray-400 transition duration-200 hover:text-white">
            <HiShare size={16} />
          </span>
        </DataTableContentItem>
      ),
      header: () => <span></span>,
      enableSorting: false,
    }),
  ]

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        sorting={sorting}
        setSorting={setSorting}
      />
    </>
  )
}
export default OrdersTable
