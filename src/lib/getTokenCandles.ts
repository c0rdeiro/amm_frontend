import { OhlcData } from 'lightweight-charts'

export async function getTokenCandles(
  symbol: string,
  frequency: string
): Promise<OhlcData[]> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }candles/%7Bsymbol,frequency%7D?symbol=${symbol.toUpperCase()}&frequency=${frequency}`
  )

  return res
    .json()
    .then((r) =>
      r.map((x: OhlcData) => ({ ...x, time: (x.time as number) / 1000 }))
    )
}
