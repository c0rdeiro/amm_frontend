import { PositionType } from '@/types/next'
import OptionsRightPanel from './OptionRightPanel'
import PositionRightPanel from './PositionRightPanel'

type RightPanelProps = {
  position?: PositionType | undefined
  isOption: boolean
}

const RightPanel: React.FC<RightPanelProps> = ({ isOption, position }) => {
  return (
    <div className="item-center 2xl:px-13 flex min-h-full w-rightPanel-min flex-initial flex-col gap-4 bg-gray-400 pt-14 font-medium xl:px-2 2xl:w-rightPanel">
      {/*  default no options selected */}
      {isOption ? (
        <OptionsRightPanel />
      ) : (
        position && <PositionRightPanel position={position} />
      )}
    </div>
  )
}

export default RightPanel
