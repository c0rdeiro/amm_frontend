export const calcPayoff = (
  tokenPrice: number,
  strike: number,
  pricePerOption: number,
  isCall: boolean
) => {
  if (isCall) {
    return Math.max(0, tokenPrice - strike) - pricePerOption
  } else {
    return Math.max(0, strike - tokenPrice) - pricePerOption
  }
}

export const calcChartData = (
  maxRange: number,
  strike: number,
  isCall: boolean,
  isBuy: boolean,
  optionPrice: number,
  numContracts: number
) => {
  const data: { tokenPrice: number; payoff: number }[] = []

  for (let index = 0; index < maxRange; index += 5) {
    data.push({
      tokenPrice: index,
      payoff:
        (isBuy
          ? calcPayoff(index, strike, optionPrice, isCall)
          : -1 * calcPayoff(index, strike, optionPrice, isCall)) * numContracts,
    })
  }

  return data
}
