import { PositionType } from '@/types/next'
import formatDateTime from '@/utils/formatDateTime'
import formatNumber from '@/utils/formatNumber'
import { createColumnHelper, Row } from '@tanstack/react-table'
import { useState } from 'react'
import { IoTrendingDownSharp, IoTrendingUpSharp } from 'react-icons/io5'

import DataTable from '../../shared/DataTable'
import { DataTableContentItem } from '../../shared/DataTableContentItem'
import PositionsExpandedRow from '../PositionsExpandedRow'

type PositionsCompactTableProps = {
  data: PositionType[]
  showTableHeader?: boolean
}
const PositionsCompactTable: React.FC<PositionsCompactTableProps> = ({
  data,
  showTableHeader = true,
}) => {
  const columnHelper = createColumnHelper<PositionType>()
  const columns = [
    columnHelper.accessor('numContracts', {
      id: 'numContracts',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {info.row.original.operation === 'Call' ? (
            <>
              <IoTrendingUpSharp size="1.125rem" color="green" /> Call
            </>
          ) : (
            <>
              <IoTrendingDownSharp size="1.125rem" color="red" /> Put
            </>
          )}
          {formatNumber(info.getValue(), { decimalCases: 3 })}
        </DataTableContentItem>
      ),
      header: () => <span>Contracts</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('strike', {
      id: 'strike',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Strike</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('size', {
      id: 'size',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Size</span>,
    }),

    columnHelper.accessor('pnl', {
      id: 'pnl',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>P&L</span>,
    }),

    columnHelper.accessor('expiryTime', {
      id: 'expDate',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {formatDateTime(new Date(info.getValue()))}
        </DataTableContentItem>
      ),
      header: () => <span>Seconds to Expiry</span>,
      enableSorting: false,
    }),

    columnHelper.accessor('status', {
      id: 'status',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {info.getValue() === 'Open' ? (
            <span className=" text-text-gray ">Open</span>
          ) : (
            <span className=" text-red">Closed</span>
          )}
        </DataTableContentItem>
      ),
      header: () => <span>Status</span>,
      enableSorting: false,
    }),
  ]

  const [isConfirming, setIsConfirming] = useState<boolean>(false)
  const renderSubComponent = ({ row }: { row: Row<PositionType> }) => {
    return (
      <PositionsExpandedRow
        row={row}
        onClosePosition={() => {
          setIsConfirming(true)
        }}
        isConfirmingBtn={isConfirming}
      />
    )
  }
  return (
    <DataTable
      colorScheme="white"
      data={data}
      columns={columns}
      getRowCanExpand={(row: Row<PositionType>) =>
        row.original.status === 'Open'
      }
      renderSubComponent={renderSubComponent}
      showHeader={showTableHeader}
    />
  )
}
export default PositionsCompactTable
