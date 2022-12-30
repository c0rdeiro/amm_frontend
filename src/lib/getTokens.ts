import { MarketTokenType } from '@/types/next'
import path from 'path'

export async function getTokens(): Promise<MarketTokenType[]> {
  const res = await fetch(
    path.join(process.env.NEXT_PUBLIC_API_URL ?? '', `prices`)
  )

  return res.json().then((res) => res?.tokens)
}