import clsx from 'clsx'
import { HTMLInputTypeAttribute } from 'react'

type InputProps = {
  value: string
  type?: HTMLInputTypeAttribute
  size?: 'md' | 'lg'
  onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({
  value,
  type = 'text',
  size = 'md',
  onChange,
}: InputProps) => {
  return (
    <input
      className={clsx(
        {
          'h-9 w-29': size === 'md',
          'h-12 w-full': size === 'lg',
        },
        ' items-center gap-6 rounded-lg border border-solid border-input-border bg-white px-4 py-2 font-medium text-primary'
      )}
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Input
