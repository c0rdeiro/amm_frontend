import TokenPositionsPanel from '@/components/Positions/Token/TokenPositionsPanel'
import RightPanel from '@/components/RightPanel/RightPanel'
import ChartContainer from '@/components/Trading/Chart/ChartContainer'
import OptionsPanel from '@/components/Trading/OptionsPanel/OptionsPanel'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const token = await getToken({ req: context.req })

  const address = token?.sub ?? null

  return {
    props: {
      address,
      session,
    },
  }
}

type AuthenticatedPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>
const MarketTradingPage = ({ ...props }: AuthenticatedPageProps) => {
  return (
    <div className="flex h-full">
      <div className="w-full overflow-y-auto pt-14 pb-28 xl:px-2 2xl:shrink 2xl:px-20">
        <ChartContainer />
        <OptionsPanel />
        <TokenPositionsPanel />
      </div>
      <RightPanel isOption={true} />
    </div>
  )
}

export default MarketTradingPage
