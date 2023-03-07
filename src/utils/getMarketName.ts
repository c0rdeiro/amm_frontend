import { Market } from '@lyrafinance/lyra-js'

export default function getMarketName(market: Market): string {
  switch (market.baseToken.symbol.toLowerCase()) {
    case 'eth':
    case 'weth':
      return 'ETH'
    case 'btc':
    case 'wbtc':
      return 'BTC'
    default:
      return ''
  }
}
