import Input from '../Form/Input'

type TokenSwapItemProps = {
  label: string
  value: number
  tokenSelect: React.ReactNode
  secondaryText?: string
}

const TokenSwapItem: React.FC<TokenSwapItemProps> = ({
  label,
  value,
  tokenSelect,
  secondaryText,
}) => {
  return (
    <div className="flex flex-col gap-2 bg-text-gray p-3 dark:bg-darkSecondary">
      <div className="flex justify-between text-sm dark:text-text-gray">
        <div>{label}</div>
        <div>{secondaryText}</div>
      </div>
      <div className="flex items-center justify-between">
        <Input
          value={value.toString()}
          onChange={() => {}}
          styleType="discrete"
        />
        {tokenSelect}
      </div>
    </div>
  )
}
export default TokenSwapItem
