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
  const getOnClickFunction = () => {
    switch (clickType) {
      case 'expand':
        return row.getToggleExpandedHandler()
      case 'select':
        return row.getToggleSelectedHandler()
      case 'no-action':
      default:
        return undefined
    }
  }

  return (
    <div
      className="flex items-center gap-1 py-2 pl-6 "
      onClick={getOnClickFunction}
    >
      {children}
    </div>
  )
}
