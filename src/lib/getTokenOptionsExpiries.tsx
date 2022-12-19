export async function getTokenOptionsExpiries(
  symbol: string
): Promise<string[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expiries/${symbol.toUpperCase()}`
  )

  return res.json().then((val) => val.output)
}
