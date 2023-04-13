import formatNumber from '@/utils/formatNumber'
import { createColumnHelper } from '@tanstack/react-table'

import { DataTableContentItem } from '../shared/DataTableContentItem'
import DataTable from '../shared/DataTable'
import clsx from 'clsx'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { AiOutlineEdit } from 'react-icons/ai'
import GMXClosePositionModal from '../Modals/GMXClosePositionModal'
import { useState } from 'react'

type GMXPositionsTableProps = {
  data: GMXPosition[]
  showTableHeader?: boolean
}
const GMXPositionsTable: React.FC<GMXPositionsTableProps> = ({
  data,
  showTableHeader = true,
}) => {
  const showPnlAfterFees = false //TODO
  const [isCloseModalOpen, setisCloseModalOpen] = useState(false)
  const [currentPosition, setCurrentPosition] = useState<
    GMXPosition | undefined
  >()

  const closePosition = (position: GMXPosition) => {
    setisCloseModalOpen(true)
    setCurrentPosition(position)
  }

  const editColateral = (position: GMXPosition) => {
    console.log('edit collateral', position)
  }

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
          <div className="flex items-center gap-1">
            {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
            <span
              className="hover:cursor-pointer"
              onClick={() => editColateral(info.row.original)}
            >
              <AiOutlineEdit />
            </span>
          </div>
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
    columnHelper.accessor('key', {
      id: 'close',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <span
            className="p-2 hover:cursor-pointer"
            onClick={() => closePosition(info.row.original)}
          >
            Close
          </span>
        </DataTableContentItem>
      ),
      header: () => <span></span>,
    }),
    // columnHelper.accessor('key', {
    //   id: 'actions',
    //   cell: (info) => (
    //     <DataTableContentItem clickType="no-action" row={info.row}>
    //       <span className="hover:cursor-pointer">
    //         <HiOutlineDotsVertical />
    //       </span>
    //     </DataTableContentItem>
    //   ),
    //   header: () => <span></span>,
    // }),
  ]

  return (
    <>
      <DataTable
        colorScheme="white"
        data={data}
        columns={columns}
        showHeader={showTableHeader}
      />
      {currentPosition && (
        <GMXClosePositionModal
          position={currentPosition}
          isOpen={isCloseModalOpen}
          setIsOpen={setisCloseModalOpen}
        />
      )}
    </>
  )
}
export default GMXPositionsTable
