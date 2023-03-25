import clsx from 'clsx'
import { HTMLInputTypeAttribute } from 'react'

type InputProps = {
  value: string
  type?: HTMLInputTypeAttribute
  size?: 'md' | 'lg'
  styleType?: 'normal' | 'discrete'
  onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({
  value,
  type = 'text',
  size = 'md',
  styleType = 'normal',
  onChange,
}: InputProps) => {
  return (
    <input
      className={clsx(
        {
          'h-9 w-29': size === 'md',
          'h-12 w-full': size === 'lg',
          'rounded-lg border border-solid border-input-border bg-white px-4 dark:bg-darkSecondary':
            styleType === 'normal',
          'bg-text-gray text-2xl dark:bg-darkSecondary':
            styleType === 'discrete', //TODO: this bg should be inherit, look up why it doesnt apply that
        },
        'items-center gap-6  py-2 font-medium text-black focus-visible:outline-none dark:text-white'
      )}
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Input
