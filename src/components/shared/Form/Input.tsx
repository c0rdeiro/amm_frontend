import clsx from 'clsx'
import { HTMLInputTypeAttribute } from 'react'

type InputProps = {
  value: string
  type?: HTMLInputTypeAttribute
  size?: 'md' | 'lg' | 'checkbox'
  styleType?: 'normal' | 'discrete'
  onChange: (value: string) => void
  isDisabled?: boolean
  checked?: boolean
}

const Input: React.FC<InputProps> = ({
  value,
  type = 'text',
  size = 'md',
  styleType = 'normal',
  onChange,
  isDisabled = false,
  checked = false,
}: InputProps) => {
  return (
    <input
      className={clsx(
        {
          'h-4 w-4 accent-primary': size === 'checkbox',
          'h-9 w-29': size === 'md',
          'h-12 w-full': size === 'lg',
          'rounded-lg border border-solid border-input-border bg-white px-4 dark:bg-darkSecondary':
            styleType === 'normal',
          'bg-gray-400 text-2xl dark:bg-darkSecondary':
            styleType === 'discrete', //TODO: this bg should be inherit, look up why it doesnt apply that
        },
        'text-text-DEFAULT items-center  gap-6 py-2 font-medium focus-visible:outline-none dark:text-white'
      )}
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      disabled={isDisabled}
      checked={checked}
    />
  )
}

export default Input
