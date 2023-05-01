import TokenPositionsPanel from '@/components/Positions/IVX/TokenPositionsPanel'
import RightPanel from '@/components/RightPanel/RightPanel'
import Chart from '@/components/Trading/Chart/Chart'

type TradingPageProps = {
  tokenName: string
}

const MarketTradingPage: React.FC<TradingPageProps> = ({ tokenName }) => {
  return (
    <div className="flex h-full w-full flex-col justify-between pb-5 text-white xl:flex-row 2xl:pb-0">
      <div className="w-full shrink">
        <Chart />
        {/*<TokenPositionsPanel /> */}
      </div>
      <RightPanel />
    </div>
  )
}

export default MarketTradingPage
