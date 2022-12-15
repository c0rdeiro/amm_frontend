import { tokens } from '@/constants'
import useTokenIcon from '@/hooks/useTokenIcon'
import { PositionType } from '@/types/next'
import formatDateTime from '@/utils/formatDateTime'
import formatNumber from '@/utils/formatNumber'
import { getPercentage } from '@/utils/getPercentage'
import { createColumnHelper, Row } from '@tanstack/react-table'
import clsx from 'clsx'
import { useState } from 'react'
import { IoTrendingUpSharp, IoTrendingDownSharp } from 'react-icons/io5'
import DataTable from '../shared/DataTable'
import { DataTableContentItem } from '../shared/DataTableContentItem'
import ClosePositionDrawerContent from './ClosePositionDrawerContent'
import Drawer from './Drawer'
import PositionsExpandedRow from './PositionsExpandedRow'

const PositionsTable = () => {
  const data: PositionType[] = [
    {
      token: tokens[0]!,
      operation: 'Call',
      numContracts: 0.546,
      strike: 1300.0,
      expDate: new Date('2022-11-4'),
      value: 7.45,
      costPerOption: 1375.21,
      price: 1456.09,
      profit: 44.16,
      status: 'Closed',
      impliedVolatility: 88.74,
      delta: 4.45,
      vega: 12.12,
      gamma: 21.32,
      theta: 14.14,
      openInterest: 3800,
      openDate: new Date(),
    },
    {
      token: tokens[1]!,
      operation: 'Put',
      numContracts: 0.546,
      strike: 1300.0,
      expDate: new Date('2022-11-4'),
      value: 7.45,
      costPerOption: 1456.09,
      price: 1375.21,
      profit: -44.16,
      status: 'Open',
      impliedVolatility: 88.74,
      delta: 4.45,
      vega: 12.12,
      gamma: 21.32,
      theta: 14.14,
      openInterest: 3800,
      openDate: new Date(),
    },
  ]

  const columnHelper = createColumnHelper<PositionType>()
  const columns = [
    columnHelper.accessor('token', {
      id: 'token',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {useTokenIcon(info.getValue().label, 18)}
          {info.getValue().label}
        </DataTableContentItem>
      ),
      header: () => <span>Market</span>,
    }),
    columnHelper.accessor('operation', {
      id: 'operation',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {info.getValue() === 'Call' ? (
            <>
              <IoTrendingUpSharp size="1.125rem" color="green" /> Call
            </>
          ) : (
            <>
              <IoTrendingDownSharp size="1.125rem" color="red" /> Put
            </>
          )}
        </DataTableContentItem>
      ),
      header: () => <span>Operation</span>,
    }),
    columnHelper.accessor('numContracts', {
      id: 'numContracts',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
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

    columnHelper.accessor('expDate', {
      id: 'expDate',
      cell: (info) => (
        <DataTableContentItem clickType="expand" row={info.row}>
          {formatDateTime(info.getValue())}
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
        <DataTableContentItem clickType="expand" row={info.row}>
          <span
            className={clsx({
              'text-green': info.getValue() > 0,
              'text-red': info.getValue() < 0,
              'text-text-default': info.getValue() === 0,
            })}
          >
            {formatNumber(info.getValue(), {
              decimalCases: 2,
              symbol: '$',
              displayPositive: true,
            })}{' '}
            (
            {formatNumber(
              getPercentage(
                info.getValue(),
                info.row.original.costPerOption * info.row.original.numContracts
              ),
              { decimalCases: 2, symbol: '%', isSymbolEnd: true }
            )}
            )
          </span>
        </DataTableContentItem>
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
  const [closePositionDrawerOpen, setClosePositionDrawerOpen] = useState(false)

  const renderSubComponent = ({ row }: { row: Row<PositionType> }) => {
    return (
      <>
        <PositionsExpandedRow
          row={row}
          onClosePosition={() => setClosePositionDrawerOpen(true)}
        />
        <Drawer
          open={closePositionDrawerOpen}
          title={''}
          setOpen={setClosePositionDrawerOpen}
        >
          <ClosePositionDrawerContent position={row.original} />
        </Drawer>
      </>
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
    />
  )
}
export default PositionsTable