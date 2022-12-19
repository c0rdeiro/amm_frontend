import { OptionType } from '@/types/next'

export async function getTokenOptions(
  symbol: string,
  expDate: number,
  isCall: boolean,
  isSell: boolean
): Promise<OptionType[]> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/board/{symbol,expiry,iscall,issell}?symbol=${symbol.toUpperCase()}&expiry=${expDate}&iscall=${isCall}&issell=${isSell}`
  )

  return res.json().then((val) => val.output)
}
