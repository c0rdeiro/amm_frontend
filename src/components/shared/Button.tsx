import clsx from 'clsx'

type ButtonProps = {
  label: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'nopadding'
  isDisabled?: boolean
  styleType?:
    | 'normal'
    | 'shadow'
    | 'outline'
    | 'green'
    | 'red'
    | 'monochromatic'
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  labelColor?: 'white' | 'gray' | 'dark'
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  label,
  onClick,
  size = 'md',
  isDisabled = false,
  styleType = 'normal',
  rightIcon,
  leftIcon,
  labelColor = 'white',
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        {
          'text-white': labelColor === 'white',
          'text-gray-300': labelColor === 'gray',
          'text-gray-700 ': labelColor === 'dark',
          'h-7 py-3 px-2 text-xs font-medium': size === 'xs',
          'h-9 py-1 px-3 text-sm font-medium': size === 'sm',
          'h-13 w-44 py-4 px-6': size === 'md',
          'w-full py-3': size === 'lg',
          'bg-green-500 hover:bg-green-400': styleType === 'green',
          'bg-red-400 ': styleType === 'red',
          'bg-gray-500': styleType === 'monochromatic',
          'bg-primary text-sm font-medium transition duration-500 hover:bg-primaryDarker':
            styleType === 'normal',
        },
        'flex items-center justify-center gap-2 rounded disabled:opacity-30'
      )}
    >
      {leftIcon}
      {label}
      {rightIcon}
    </button>
  )
}

export default Button
