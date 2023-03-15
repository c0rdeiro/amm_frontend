import TokenPositionsPanel from '@/components/Positions/Token/TokenPositionsPanel'
import RightPanel from '@/components/RightPanel/RightPanel'
import ChartContainer from '@/components/Trading/Chart/ChartContainer'

type TradingPageProps = {
  tokenName: string
}

const MarketTradingPage: React.FC<TradingPageProps> = ({ tokenName }) => {
  return (
    <div className="flex h-full">
      <div className="w-full shrink overflow-y-hidden pl-4 pt-4 ">
        <ChartContainer />
        <TokenPositionsPanel />
      </div>
      <RightPanel isOption={true} />
    </div>
  )
}

export default MarketTradingPage
