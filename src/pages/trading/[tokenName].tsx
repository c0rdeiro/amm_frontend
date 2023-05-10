import TokenPositionsPanel from '@/components/Positions/IVX/TokenPositionsPanel'
import RightPanel from '@/components/RightPanel/RightPanel'
import Chart from '@/components/Trading/Chart/Chart'

type TradingPageProps = {
  tokenName: string
}

const MarketTradingPage: React.FC<TradingPageProps> = ({ tokenName }) => {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-5 pb-5 text-white lg:gap-0 xl:flex-row 2xl:pb-0">
      <div className="flex w-full shrink flex-col gap-5 lg:ml-5">
        <Chart />
        <span className="hidden xl:flex">
          <TokenPositionsPanel />
        </span>
      </div>
      <RightPanel />
      <span className="xl:hidden ">
        <TokenPositionsPanel />
      </span>
    </div>
  )
}

export default MarketTradingPage
