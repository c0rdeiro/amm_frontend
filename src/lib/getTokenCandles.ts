import { OhlcData } from 'lightweight-charts'

export async function getTokenCandles(
  symbol: string,
  frequency: string
): Promise<OhlcData[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/candles/%7Bsymbol,frequency%7D?symbol=${symbol}&frequency=${frequency}`
  )

  // res.json().then((value) => {
  //   for (let val of value) {
  //     console.log('uhuhuh inside', { val })
  //   }
  // })
  return res.json()
}
