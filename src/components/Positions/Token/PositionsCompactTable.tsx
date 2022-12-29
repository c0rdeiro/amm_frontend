import { PositionType } from '@/types/next'
import formatDateTime from '@/utils/formatDateTime'
import formatNumber from '@/utils/formatNumber'
import { getPercentage } from '@/utils/getPercentage'
import { createColumnHelper, Row } from '@tanstack/react-table'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IoTrendingUpSharp, IoTrendingDownSharp } from 'react-icons/io5'
import DataTable from '../../shared/DataTable'
import { DataTableContentItem } from '../../shared/DataTableContentItem'
import PositionsExpandedRow from '../PositionsExpandedRow'

type PositionsCompactTableProps = {
  statusToShow: 'All' | 'Open' | 'Closed'
  showTableHeader?: boolean
}
const PositionsCompactTable: React.FC<PositionsCompactTableProps> = ({
  statusToShow,
  showTableHeader = true,
}) => {
  const router = useRouter()
  const tokenSymbol = router.asPath.split('/').pop() ?? ''

  const data: PositionType[] = [
    // {
    //   token: tokens[0]!,
    //   operation: 'Call',
    //   numContracts: 0.546,
    //   strike: 1300.0,
    //   expDate: new Date('2022-11-4'),
    //   value: 7.45,
    //   costPerOption: 1375.21,
    //   price: 1456.09,
    //   profit: 44.16,
    //   status: 'Closed',
    //   impliedVolatility: 88.74,
    //   delta: 4.45,
    //   vega: 12.12,
    //   gamma: 21.32,
    //   theta: 14.14,
    //   openInterest: 3800,
    //   openDate: new Date(),
    // },
    // {
    //   token: tokens[0]!,
    //   operation: 'Put',
    //   numContracts: 0.546,
    //   strike: 1300.0,
    //   expDate: new Date('2022-11-4'),
    //   value: 7.45,
    //   costPerOption: 1456.09,
    //   price: 1375.21,
    //   profit: -44.16,
    //   status: 'Open',
    //   impliedVolatility: 88.74,
    //   delta: 4.45,
    //   vega: 12.12,
    //   gamma: 21.32,
    //   theta: 14.14,
    //   openInterest: 3800,
    //   openDate: new Date(),
    // },
  ]

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
    }),
    columnHelper.accessor('strike', {
      id: 'strike',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Strike</span>,
    }),

    columnHelper.accessor('expiryTime', {
      id: 'expDate',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {formatDateTime(new Date(info.getValue()))}
        </DataTableContentItem>
      ),
      header: () => <span>Exp Date</span>,
    }),

    columnHelper.accessor('value', {
      id: 'value',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Value</span>,
    }),

    columnHelper.accessor('costPerOption', {
      id: 'costPerOption',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Cost Per Option</span>,
    }),

    columnHelper.accessor('price', {
      id: 'price',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2, symbol: '$' })}
        </DataTableContentItem>
      ),
      header: () => <span>Price</span>,
    }),
    columnHelper.accessor('profit', {
      id: 'profit',
      cell: (info) => (
        <span
          className={clsx({
            'text-green': info.getValue() > 0,
            'text-red': info.getValue() < 0,
            'text-text-default': info.getValue() === 0,
          })}
        >
          <DataTableContentItem clickType="expand" row={info.row}>
            {formatNumber(info.getValue(), {
              decimalCases: 2,
              symbol: '$',
              displayPositive: true,
            })}
            (
            {formatNumber(
              getPercentage(
                info.getValue(),
                info.row.original.costPerOption * info.row.original.numContracts
              ),
              { decimalCases: 2, symbol: '%', isSymbolEnd: true }
            )}
            )
          </DataTableContentItem>
        </span>
      ),
      header: () => <span>Profit</span>,
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
      data={data.filter(
        (position) =>
          (statusToShow === 'All' || position.status === statusToShow) &&
          position.token.symbol === tokenSymbol
      )}
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
