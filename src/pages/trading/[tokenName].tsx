import TokenPositionsPanel from '@/components/Positions/Token/TokenPositionsPanel'
import RightPanel from '@/components/RightPanel/RightPanel'
import ChartContainer from '@/components/Trading/Chart/ChartContainer'
import OptionsPanel from '@/components/Trading/OptionsPanel/OptionsPanel'
import { getTokens } from '@/lib/getTokens'
import { CustomPage, MarketTokenType } from '@/types/next'
import { useQuery } from '@tanstack/react-query'

type TradingPageProps = {
  tokenName: string
}

export async function getStaticPaths() {
  const paths: { params: { tokenName: string } }[] = [
    { params: { tokenName: 'eth' } },
    { params: { tokenName: 'btc' } },
  ]

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps = async ({
  params: { tokenName },
}: {
  params: { tokenName: string }
}) => {
  return { props: { tokenName } }
}

const MarketTradingPage: React.FC<TradingPageProps> = ({ tokenName }) => {
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

export default MarketTradingPage
