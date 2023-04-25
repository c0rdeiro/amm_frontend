import TokenPositionsPanel from '@/components/Positions/IVX/TokenPositionsPanel'
import RightPanel from '@/components/RightPanel/RightPanel'
import Chart from '@/components/Trading/Chart/Chart'

type TradingPageProps = {
  tokenName: string
}

const MarketTradingPage: React.FC<TradingPageProps> = ({ tokenName }) => {
  return (
    <div className="flex h-full w-full flex-col justify-between text-white xl:flex-row">
      <div className="w-full shrink pl-4 pt-4">
        <Chart />
        {/*<TokenPositionsPanel /> */}
      </div>
      <RightPanel />
    </div>
  )
}

export default MarketTradingPage
