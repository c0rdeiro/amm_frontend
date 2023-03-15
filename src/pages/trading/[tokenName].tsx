import TokenPositionsPanel from '@/components/Positions/Token/TokenPositionsPanel'
import RightPanel from '@/components/RightPanel/RightPanel'
import ChartContainer from '@/components/Trading/Chart/ChartContainer'

type TradingPageProps = {
  tokenName: string
}

const MarketTradingPage: React.FC<TradingPageProps> = ({ tokenName }) => {
  return (
    <div className="flex h-full">
      <div className="rounded-0 w-full shrink overflow-y-hidden border-t-4 border-gray-400 pl-4 pt-4 dark:border-headerDark">
        <ChartContainer />
        <TokenPositionsPanel />
      </div>
      <RightPanel isOption={true} />
    </div>
  )
}

export default MarketTradingPage
