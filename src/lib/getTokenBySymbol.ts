import { MarketTokenType } from '@/types/next'
import path from 'path'

export async function getTokenBySymbol(
  symbol: string
): Promise<MarketTokenType> {
  if (!symbol) return Promise.reject('invalid token')
  const res = await fetch(
    path.join(
      process.env.NEXT_PUBLIC_API_URL ?? '',
      `price/${symbol.toUpperCase()}`
    )
  )
  return res.json()
}
