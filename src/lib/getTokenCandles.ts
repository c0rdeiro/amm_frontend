import { OhlcData } from 'lightweight-charts'
import path from 'path'

export async function getTokenCandles(
  symbol: string,
  frequency: string
): Promise<OhlcData[]> {
  const res = await fetch(
    path.join(
      process.env.NEXT_PUBLIC_API_URL ?? '',
      `candles/%7Bsymbol,frequency%7D?symbol=${symbol.toUpperCase()}&frequency=${frequency}`
    )
  )

  return res
    .json()
    .then((r) =>
      r.map((x: OhlcData) => ({ ...x, time: (x.time as number) / 1000 }))
    )
}
