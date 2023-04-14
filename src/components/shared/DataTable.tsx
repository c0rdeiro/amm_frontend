import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  Row,
  getExpandedRowModel,
  SortingState,
  OnChangeFn,
  getSortedRowModel,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { Fragment } from 'react'
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri'

type DataTableProps<T> = {
  columns: ColumnDef<T, any>[]
  data: T[]
  rowClickAction?: (row: Row<T>) => void
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement
  getRowCanExpand?: (row: Row<T>) => boolean
  colorScheme?: 'white' | 'blue'
  enableMultiRowSelection?: boolean
  showHeader?: boolean
  sorting?: SortingState
  setSorting?: OnChangeFn<SortingState>
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
  sorting,
  setSorting,
}: DataTableProps<T>) {
  const table = useReactTable({
    columns,
    data,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiRowSelection,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
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
                  className="pl-6 text-left text-sm text-text-purple"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={clsx('flex items-center', {
                        'cursor-pointer select-none':
                          header.column.getCanSort(),
                      })}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <div className="relative flex flex-col items-center">
                          <span className="absolute -top-4 left-1">
                            <RiArrowUpSFill
                              size={24}
                              color={
                                header.column.getIsSorted() === 'asc'
                                  ? 'white'
                                  : undefined
                              }
                            />
                          </span>
                          <span className="absolute -top-2 left-1">
                            <RiArrowDownSFill
                              size={24}
                              color={
                                header.column.getIsSorted() === 'desc'
                                  ? 'white'
                                  : undefined
                              }
                            />
                          </span>
                        </div>
                      )}
                      {/* {{
                        asc: ,
                        desc: ,
                      }[header.column.getIsSorted() as string] ?? null} */}
                    </div>
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
                'active:rounded-lg active:ring-1',
                { 'rounded-lg ring-1': row.getIsSelected() },
                {
                  'hover:bg-primary/[.05] active:border-primary/[0.6] active:bg-gradient-to-r  active:from-primary/[.08] active:via-primary/[.1] active:to-primary/[.08] active:text-primary active:shadow-blue':
                    colorScheme === 'blue',
                },
                {
                  'border-primary/[0.6] bg-gradient-to-r from-primary/[.08]  via-primary/[.1] to-primary/[.08] text-primary shadow-blue hover:bg-primary/[.05]':
                    row.getIsSelected(),
                },
                {
                  'hover:bg-white dark:hover:bg-darkSecondary':
                    colorScheme === 'white',
                },
                { ' bg-white dark:bg-darkSecondary': row.getIsExpanded() }
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
              <tr className=" bg-white shadow-table-white dark:bg-darkSecondary dark:shadow-none">
                {/* 2nd row is a custom 1 cell row */}
                <td
                  colSpan={row.getVisibleCells().length}
                  className={clsx('rounded-b-lg')}
                >
                  {renderSubComponent({ row })}
                </td>
              </tr>
            )}
          </Fragment>
        ))}
        {data.length === 0 && (
          <tr>
            <td
              colSpan={columns.length}
              className="text-md py-4 text-center text-text-purple"
            >
              No data do display
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default DataTable
