import formatNumber from '@/utils/formatNumber'
import { SortingState, createColumnHelper } from '@tanstack/react-table'
import clsx from 'clsx'
import { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'

import DataTable from '../shared/DataTable'
import { DataTableContentItem } from '../shared/DataTableContentItem'
import { PositionType } from '@/types/next'
import getTokenIcon from '@/utils/getTokenIcon'
import getIconFancyIcon from '@/utils/getIconFancyIcon'
import {
  IoCloseOutline,
  IoTrendingDownSharp,
  IoTrendingUpSharp,
} from 'react-icons/io5'
import formatDateTime from '@/utils/formatDateTime'
import Button from '../shared/Button'
import { HiShare } from 'react-icons/hi2'

type OpenPositionsTableProps = {
  data: PositionType[]
  showTableHeader?: boolean
}
const OpenPositionsTable: React.FC<OpenPositionsTableProps> = ({
  data,
  showTableHeader = true,
}) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const showPnlAfterFees = false //TODO
  const [isCloseModalOpen, setisCloseModalOpen] = useState(false)
  const [isCollateralModalOpen, setisCollateralModalOpen] = useState(false)
  const [currentPosition, setCurrentPosition] = useState<
    PositionType | undefined
  >()

  const closePosition = (position: PositionType) => {
    setisCloseModalOpen(true)
    setCurrentPosition(position)
  }

  const editColateral = (position: PositionType) => {
    setisCollateralModalOpen(true)
    setCurrentPosition(position)
  }

  const columnHelper = createColumnHelper<PositionType>()
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
            <span
              className={clsx(
                'flex items-center justify-center gap-2 rounded px-2 py-1',
                {
                  'bg-[#0dac8626]': info.row.original.strategy === 'Long',
                  'bg-[#e3575926]]': info.row.original.strategy === 'Short',
                }
              )}
            >
              {info.row.original.operation}
            </span>
          </div>
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Position</span>,
      enableSorting: false,
    }),

    columnHelper.accessor('size', {
      id: 'size',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Size ($)</span>,
      enableSorting: false,
      sortingFn: 'basic',
    }),

    columnHelper.accessor('collateral', {
      id: 'collateral',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => (
        <span className="text-sm text-gray-300">Collateral ($)</span>
      ),
      enableSorting: false,
    }),

    columnHelper.accessor('entryPrice', {
      id: 'entryPrice',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Entry Price</span>,
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
    columnHelper.accessor('liqPrice', {
      id: 'liqPrice',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Liq. Price</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('unrealisedPnl', {
      id: 'unrealisedPnl',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <span
            className={clsx({
              'text-green-400': info.getValue() > 0,
              'text-red-400': info.getValue() < 0,
            })}
          >
            {formatNumber(info.getValue(), {
              decimalCases: 2,
              displayPositive: true,
            })}
            {'  ('}
            {formatNumber(0.25, {
              //TODO pnl percentage
              decimalCases: 2,
              symbol: '%',
              isSymbolEnd: true,
              displayPositive: true,
            })}
            )
          </span>
        </DataTableContentItem>
      ),
      header: () => (
        <span className="text-sm text-gray-300">Unrealised P&L</span>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor('pnl', {
      id: 'pnl',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <span
            className={clsx({
              'text-green-400': info.getValue() > 0,
              'text-red-400': info.getValue() < 0,
            })}
          >
            {formatNumber(info.getValue(), {
              decimalCases: 2,
              displayPositive: true,
            })}
            {'  ('}
            {formatNumber(0.25, {
              //TODO pnl percentage
              decimalCases: 2,
              symbol: '%',
              isSymbolEnd: true,
              displayPositive: true,
            })}
            )
          </span>
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Realised P&L</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('expiryTime', {
      id: 'expiryTime',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {info.getValue()}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Expiry</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('id', {
      id: 'close',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <button
            className="flex cursor-pointer items-center gap-1 rounded bg-gray-500 p-2 text-sm font-normal text-white transition duration-200 hover:bg-red-400"
            onClick={() => closePosition(info.row.original)}
          >
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
        colorScheme="white"
        data={data}
        columns={columns}
        showHeader={showTableHeader}
        sorting={sorting}
        setSorting={setSorting}
      />
      {/* {currentPosition && (
        <GMXClosePositionModal
          position={currentPosition}
          isOpen={isCloseModalOpen}
          setIsOpen={setisCloseModalOpen}
        />
      )}
      {currentPosition && (
        <PositionTypeCollateralModal
          position={currentPosition}
          isOpen={isCollateralModalOpen}
          setIsOpen={setisCollateralModalOpen}
        />
      )} */}
    </>
  )
}
export default OpenPositionsTable
