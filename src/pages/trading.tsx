import { CustomPage } from '@/types/next'
import { useRouter } from 'next/router'
import MarketTradingPage from './trading/[tokenName]'

const TradingPage: CustomPage = () => {
  const { push } = useRouter()
  push('/trading/eth')
  return <MarketTradingPage tokenName="eth" />
}

TradingPage.fullPage = true
TradingPage.title = 'Trading'

export default TradingPage
