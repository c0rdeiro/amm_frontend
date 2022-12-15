type PositionsExpandedRowItemProps = {
  label: string
  content: string
}

const PositionsExpandedRowItem: React.FC<PositionsExpandedRowItemProps> = ({
  label,
  content,
}) => {
  return (
    <div className="flex flex-col items-start gap-1 font-medium ">
      <div className="flex items-center text-xs capitalize text-text-purple">
        {label}
      </div>
      <div className="text-text-default flex items-center text-sm ">
        {content}
      </div>
    </div>
  )
}

export default PositionsExpandedRowItem
