import { MarketTokenType } from '@/types/next'

export async function getTokenBySymbol(
  symbol: string
): Promise<MarketTokenType> {
  if (!symbol) return Promise.reject('invalid token')
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}price/${symbol.toUpperCase()}`
  )
  return res.json()
}
