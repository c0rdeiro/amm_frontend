import { PositionType } from '@/types/next'
import BuySellOptions from './BuySellOptions'
import PositionRightPanel from './PositionRightPanel'

type RightPanelProps = {
  position?: PositionType | undefined
  isOption: boolean
}

const RightPanel: React.FC<RightPanelProps> = ({ isOption, position }) => {
  return (
    <div className="item-center px-13 flex min-h-full w-rightPanel flex-col gap-4 bg-gray-400 pt-14 font-medium ">
      {/*  default no options selected */}
      {isOption ? (
        <BuySellOptions />
      ) : (
        position && <PositionRightPanel position={position} />
      )}
    </div>
  )
}

export default RightPanel
