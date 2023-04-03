import { SupportedMarket } from '@/types/next'
import { Market } from '@lyrafinance/lyra-js'
import getMarketName from './getMarketName'

export default function getMarketNameFromBaseToken(
  market: Market
): SupportedMarket {
  const name = getMarketName(market)
  switch (name) {
    case 'ETH':
      return 'ETHUSDT'
    case 'BTC':
      return 'BTCUSDT'
    default:
      return 'ETHUSDT'
  }
}
