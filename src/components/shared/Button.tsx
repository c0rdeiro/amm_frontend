import clsx from 'clsx'

type ButtonProps = {
  label: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  size?: 'xs' | 'sm' | 'md' | 'lg'
  isDisabled?: boolean
  styleType?:
    | 'normal'
    | 'shadow'
    | 'outline'
    | 'green'
    | 'red'
    | 'monochromatic'
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
          'w-29 h-7 gap-1.5 py-1.5 px-2': size === 'xs',
          'h-10.5 w-35': size === 'sm',
          'h-13 w-44 py-4 px-6': size === 'md',
          ' w-full py-2': size === 'lg',
          'bg-green-500 text-white hover:bg-green-400': styleType === 'green',
          'bg-red-500 text-white hover:bg-red-400': styleType === 'red',
          'bg-text-gray dark:bg-darkBg text-white':
            styleType === 'monochromatic',
          'bg-primary text-sm font-medium text-gray-700 transition duration-500 hover:bg-primaryDarker':
            styleType === 'normal',
        },
        'flex items-center justify-center gap-2 rounded disabled:opacity-30'
      )}
    >
      {label}
      {rightIcon}
    </button>
  )
}

export default Button
