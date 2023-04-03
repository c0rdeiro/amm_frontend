import { SupportedMarketSymbols } from '@/types/next'

type Binance24hTicker = {
  symbol: string
  priceChange: string
  priceChangePercent: string
  weightedAvgPrice: string
  prevClosePrice: string
  lastPrice: string
  lastQty: string
  bidPrice: string
  bidQty: string
  askPrice: string
  askQty: string
  openPrice: string
  highPrice: string
  lowPrice: string
  volume: string
  quoteVolume: string
  openTime: number
  closeTime: number
  firstId: number
  lastId: number
  count: number
}

export type Token24hData = { change: number; high: number; low: number }

export async function getToken24h(
  market: SupportedMarketSymbols
): Promise<Token24hData> {
  const data: Binance24hTicker = await (
    await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${market}`)
  ).json()

  return {
    change: +data.priceChangePercent / 100,
    high: +data.highPrice,
    low: +data.lowPrice,
  }
}
