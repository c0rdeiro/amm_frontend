import { HTMLInputTypeAttribute } from 'react'

type InputProps = {
  value: string
  type?: HTMLInputTypeAttribute
  onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({
  value,
  type = 'text',
  onChange,
}: InputProps) => {
  return (
    <input
      className="h-9 w-29 items-center gap-6 rounded-lg border border-solid border-input-border bg-white px-4 py-2 font-medium text-primary"
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Input
