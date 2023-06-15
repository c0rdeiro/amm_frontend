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
  VisibilityState,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment } from 'react'
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri'

type DataTableProps<T> = {
  columns: ColumnDef<T, any>[]
  data: T[]
  rowClickAction?: (row: Row<T>) => void
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement
  getRowCanExpand?: (row: Row<T>) => boolean
  enableMultiRowSelection?: boolean
  showHeader?: boolean
  sorting?: SortingState
  setSorting?: OnChangeFn<SortingState>
  columnVisibility?: VisibilityState
}

function DataTable<T>({
  columns,
  data,
  rowClickAction,
  renderSubComponent,
  getRowCanExpand,
  enableMultiRowSelection = false,
  showHeader = true,
  sorting,
  setSorting,
  columnVisibility,
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
      columnVisibility,
    },
    onSortingChange: setSorting,
  })

  return (
    <table className="w-full table-auto">
      {showHeader && (
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <AnimatePresence initial={false} key={header.id}>
                  <motion.th
                    transition={{ duration: 0.7, type: 'spring' }}
                    layout="position"
                    className="border-b border-gray-500 pl-6 pb-2 text-left text-sm"
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
                  </motion.th>
                </AnimatePresence>
              ))}
            </tr>
          ))}
        </thead>
      )}
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <AnimatePresence>
              <motion.tr
                key={row.id}
                onClick={() =>
                  rowClickAction ? rowClickAction(row) : undefined
                }
                className={clsx('active:rounded-lg active:ring-1', {
                  'rounded-lg ring-1': row.getIsSelected(),
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <motion.td
                    key={cell.id}
                    className={clsx(
                      'text-sm font-medium first:rounded-l-lg last:rounded-r-lg',
                      { '!rounded-b-none': row.getIsExpanded() }
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </motion.td>
                ))}
              </motion.tr>
            </AnimatePresence>

            {row.getIsExpanded() && renderSubComponent && (
              <tr className=" shadow-table-white dark:bg-darkSecondary bg-white dark:shadow-none">
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
              className="text-md text-text-purple py-4 text-center"
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
