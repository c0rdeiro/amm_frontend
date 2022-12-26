import { MarketTokenType } from '@/types/next'

export async function getTokens(): Promise<MarketTokenType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prices`)

  return res.json().then((res) => res?.tokens)
}
