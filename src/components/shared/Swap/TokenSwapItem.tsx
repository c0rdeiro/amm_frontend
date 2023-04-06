import Input from '../Form/Input'

type TokenSwapItemProps = {
  label: string
  value: number
  onValueChange: (qt: number) => void
  tokenSelect: React.ReactNode
  secondaryText?: string
  isInputDisabled?: boolean
}

const TokenSwapItem: React.FC<TokenSwapItemProps> = ({
  label,
  value,
  onValueChange,
  tokenSelect,
  secondaryText,
  isInputDisabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2 bg-gray-400 p-3 dark:bg-darkSecondary">
      <div className="flex justify-between text-sm text-text-gray">
        <div>{label}</div>
        <div>{secondaryText}</div>
      </div>
      <div className="flex items-center justify-between">
        <Input
          value={value.toString()}
          onChange={(e) => onValueChange(+e)}
          type="number"
          styleType="discrete"
          isDisabled={isInputDisabled}
        />
        {tokenSelect}
      </div>
    </div>
  )
}
export default TokenSwapItem
