import { useSelectedOption } from '@/store/optionsStore'
import BuySellOptions from './BuySellOptions'
import NoOptions from './NoOptions'

const RightPanel: React.FC = () => {
  const option = useSelectedOption()
  return (
    <div className="item-center flex min-h-full w-rightPanel flex-initial flex-col gap-4 bg-gray-400 pt-14 font-medium xl:px-2 2xl:px-14">
      {/*  default no options selected */}
      {option ? <BuySellOptions option={option} /> : <NoOptions />}
    </div>
  )
}

export default RightPanel
