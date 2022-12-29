export async function getTokenOptionsExpiries(
  symbol: string
): Promise<string[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expiries/${symbol.toUpperCase()}`
  )

  return res
    .json()
    .then((val) => val.output)
    .then((exps) => exps.map((i:string) => +i*1000).filter((i: number) => new Date(i) > new Date()))
}
