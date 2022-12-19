import { MarketTokenType } from '@/types/next'

export async function getTokenBySymbol(
  symbol: string
): Promise<MarketTokenType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/price/${symbol}`)
  return res.json()
}
