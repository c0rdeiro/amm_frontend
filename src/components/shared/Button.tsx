import clsx from 'clsx'

type ButtonProps = {
  label: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  size?: 'xs' | 'sm' | 'md' | 'lg'
  isDisabled?: boolean
  styleType?: 'normal' | 'shadow' | 'outline'
  rightIcon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  label,
  onClick,
  size = 'md',
  isDisabled = false,
  styleType = 'normal',
  rightIcon,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        {
          'h-7 w-29 gap-1.5 py-1.5 px-2': size === 'xs',
          'h-10.5 w-35': size === 'sm',
          'h-13 w-44 py-4 px-6': size === 'md',
          'h-15 w-50': size === 'lg',
          'bg-primary text-white hover:bg-primary-light active:bg-primary-dark':
            styleType !== 'outline',
          'shadow-blue': styleType === 'shadow',
          'bg-white text-primary hover:border hover:border-primary-light active:border active:border-primary-dark':
            styleType === 'outline',
        },
        'flex items-center justify-center gap-2 rounded-lg disabled:opacity-30'
      )}
    >
      {label}
      {rightIcon}
    </button>
  )
}

export default Button
