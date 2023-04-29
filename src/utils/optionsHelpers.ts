export const calcPayoff = (
  tokenPrice: number,
  strike: number,
  pricePerOption: number,
  isCall: boolean,
  isBuy: boolean,
  numContracts: number
) => {
  if (isBuy) {
    if (isCall) {
      return (Math.max(0, tokenPrice - strike) - pricePerOption) * numContracts
    } else {
      return (Math.max(0, strike - tokenPrice) - pricePerOption) * numContracts
    }
  } else {
    if (isCall) {
      return (
        -1 * (Math.max(0, tokenPrice - strike) - pricePerOption) * numContracts
      )
    } else {
      return (
        -1 * (Math.max(0, strike - tokenPrice) - pricePerOption) * numContracts
      )
    }
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
      payoff: calcPayoff(
        index,
        strike,
        optionPrice,
        isCall,
        isBuy,
        numContracts
      ),
    })
  }

  return data
}
