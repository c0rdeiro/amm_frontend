import { Market } from '@lyrafinance/lyra-js'

export default function getMarketName(market: Market): string {
  switch (market.baseToken.symbol.toLowerCase()) {
    case 'eth':
    case 'weth':
      return 'ETH'
    case 'btc':
      return 'BTC'
    default:
      return ''
  }
}
