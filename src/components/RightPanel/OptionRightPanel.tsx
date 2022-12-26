import { useSelectedOption } from '@/store/optionsStore'
import BuySellOptions from './BuySellOptions'
import NoOptions from './NoOptions'

const OptionsRightPanel: React.FC = () => {
  const option = useSelectedOption()

  return option ? <BuySellOptions option={option} /> : <NoOptions />
}
export default OptionsRightPanel
