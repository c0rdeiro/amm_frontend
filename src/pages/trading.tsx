import TokenPositionsPanel from '@/components/Positions/Token/TokenPositionsPanel'
import RightPanel from '@/components/RightPanel/RightPanel'
import ChartContainer from '@/components/Trading/Chart/ChartContainer'
import OptionsPanel from '@/components/Trading/OptionsPanel/OptionsPanel'
import { CustomPage } from '@/types/next'

const TradingPage: CustomPage = () => {
  return (
    <div className="flex h-full">
      <div className="w-full overflow-y-auto pt-14 pb-28 xl:px-2 2xl:shrink 2xl:px-20">
        <ChartContainer />
        <OptionsPanel />
        <TokenPositionsPanel />
      </div>
      <RightPanel />
    </div>
  )
}

TradingPage.fullPage = true
TradingPage.title = 'Trading'

export default TradingPage
