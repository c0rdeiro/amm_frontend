import { Row } from '@tanstack/react-table'

type DataTableContentItemProps<T> = {
  children: React.ReactNode
  row: Row<T>
  clickType: 'expand' | 'select' | 'no-action'
}

export function DataTableContentItem<T>({
  children,
  row,
  clickType,
}: DataTableContentItemProps<T>) {
  return (
    <div
      className="flex items-center gap-1 py-2  pl-6 "
      onClick={
        clickType === 'expand'
          ? row.getToggleExpandedHandler()
          : clickType === 'select'
          ? row.getToggleSelectedHandler()
          : undefined
      }
    >
      {children}
    </div>
  )
}
