import { PositionType } from '@/types/next'
import BuySellOptions from './BuySellOptions'
import OptionsExchange from './OptionsExchange'
import PositionRightPanel from './PositionRightPanel'

type RightPanelProps = {
  position?: PositionType | undefined
  isOption: boolean
}

const RightPanel: React.FC<RightPanelProps> = ({ isOption, position }) => {
  return (
    <div className="item-center px-13 flex min-h-full w-rightPanel flex-col gap-4 rounded-lg border-4 border-gray-400 p-1 pt-8 font-medium ">
      {/*  default no options selected */}
      {isOption ? (
        // <BuySellOptions />
        <OptionsExchange />
      ) : (
        position && <PositionRightPanel position={position} />
      )}
    </div>
  )
}

export default RightPanel
