import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  Row,
  getExpandedRowModel,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { Fragment } from 'react'

type DataTableProps<T> = {
  columns: ColumnDef<T, any>[]
  data: T[]
  rowClickAction?: (row: Row<T>) => void
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement
  getRowCanExpand?: (row: Row<T>) => boolean
  colorScheme?: 'white' | 'blue'
  enableMultiRowSelection?: boolean
  showHeader?: boolean
}

function DataTable<T>({
  columns,
  data,
  rowClickAction,
  renderSubComponent,
  getRowCanExpand,
  colorScheme = 'blue',
  enableMultiRowSelection = false,
  showHeader = true,
}: DataTableProps<T>) {
  const table = useReactTable({
    columns,
    data,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableMultiRowSelection,
  })

  return (
    <table className="w-full table-auto">
      {showHeader && (
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="pl-6 text-left text-xs text-text-purple"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      )}
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <tr
              key={row.id}
              onClick={() => (rowClickAction ? rowClickAction(row) : undefined)}
              className={clsx(
                'hover:cursor-pointer active:rounded-lg active:ring-1',
                { 'rounded-lg ring-1': row.getIsSelected() },
                {
                  'hover:bg-primary/[.05] active:border-primary/[0.6] active:bg-gradient-to-r  active:from-primary/[.08] active:via-primary/[.1] active:to-primary/[.08] active:text-primary active:shadow-blue':
                    colorScheme === 'blue',
                },
                {
                  'border-primary/[0.6] bg-gradient-to-r from-primary/[.08]  via-primary/[.1] to-primary/[.08] text-primary shadow-blue hover:bg-primary/[.05]':
                    row.getIsSelected(),
                },
                { 'hover:bg-white ': colorScheme === 'white' },
                { ' bg-white ': row.getIsExpanded() }
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={clsx(
                    'text-sm font-medium first:rounded-l-lg last:rounded-r-lg',
                    { '!rounded-b-none': row.getIsExpanded() }
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>

            {row.getIsExpanded() && renderSubComponent && (
              <tr className=" bg-white shadow-table-white">
                {/* 2nd row is a custom 1 cell row */}
                <td
                  colSpan={row.getVisibleCells().length}
                  className={clsx('rounded-b-lg')}
                >
                  {renderSubComponent({ row })}
                </td>
              </tr>
            )}
            {!data.length && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-sm text-text-purple"
                >
                  No data do display
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
