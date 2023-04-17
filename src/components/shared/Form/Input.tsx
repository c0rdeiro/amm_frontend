import clsx from 'clsx'
import { HTMLInputTypeAttribute } from 'react'

type InputProps = {
  value: string | undefined
  type?: HTMLInputTypeAttribute
  size?: 'md' | 'lg' | 'checkbox'
  styleType?: 'normal' | 'discrete'
  onChange: (value: string) => void
  isDisabled?: boolean
  checked?: boolean
  placeholder?: string
}

const Input: React.FC<InputProps> = ({
  value,
  type = 'text',
  size = 'md',
  styleType = 'normal',
  onChange,
  isDisabled = false,
  checked = false,
  placeholder,
}: InputProps) => {
  return (
    <input
      className={clsx(
        'items-center gap-6 py-1 pl-2 font-medium focus-visible:outline-none dark:text-white',
        {
          'h-4 w-4 accent-primary': size === 'checkbox',
          'w-29 h-9': size === 'md',
          'h-12 w-full': size === 'lg',
          'rounded-lg border border-solid border-input-border px-4':
            styleType === 'normal',
          'rounded bg-gray-600': styleType === 'discrete', //TODO: this bg should be inherit, look up why it doesnt apply that
        }
      )}
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      disabled={isDisabled}
      checked={checked}
      placeholder={placeholder}
    />
  )
}

export default Input
