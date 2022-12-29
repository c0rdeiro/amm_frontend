import { OptionType } from '@/types/next'

export async function getTokenOptions(
  symbol: string,
  expiryTime: number,
  isCall: boolean,
  isSell: boolean
): Promise<OptionType[]> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/board/{symbol,expiry,iscall,issell}?symbol=${symbol.toUpperCase()}&expiry=${
      expiryTime / 1000
    }&iscall=${isCall}&issell=${isSell}`
  )

  return res
    .json()
    .then((val) => val.output)
    .then((val) =>
      val.map((x: OptionType) => ({ ...x, expiryTime: x.expiryTime * 1000 }))
    )
}
