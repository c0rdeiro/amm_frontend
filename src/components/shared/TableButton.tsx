import clsx from 'clsx'

type TableButtonProps = {
  label: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  isDisabled?: boolean
  styleType?: 'normal' | 'outline'
  rightIcon?: React.ReactNode
}

//TODO: merge with Button component
const TableButton: React.FC<TableButtonProps> = ({
  label,
  onClick,
  isDisabled = false,
  styleType = 'normal',
  rightIcon,
}: TableButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        {
          'bg-primary text-white hover:bg-primary-light active:bg-primary-dark':
            styleType !== 'outline',
          'border border-primary bg-white text-primary hover:border-primary-light active:border active:border-primary-dark':
            styleType === 'outline',
        },
        'flex items-center justify-center gap-2 rounded-lg px-6 py-2 text-xs font-medium disabled:opacity-30'
      )}
    >
      {label}
      {rightIcon}
    </button>
  )
}

export default TableButton
