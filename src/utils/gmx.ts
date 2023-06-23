export const BASIS_POINTS_DIVISOR = 10000
export const MAX_LEVERAGE = 100 * BASIS_POINTS_DIVISOR
export const MAX_ALLOWED_LEVERAGE = 50 * BASIS_POINTS_DIVISOR
export const MARGIN_FEE_BASIS_POINTS = 10
export const USD_DECIMALS = 30
export const LIQUIDATION_FEE = 5 * 10 ** USD_DECIMALS

function getLiquidationPriceFromDelta(
  liquidationAmount: bigint,
  size: bigint,
  collateral: bigint,
  averagePrice: bigint,
  isLong: boolean
) {
  if (!size || size === 0n) {
    return
  }

  if (liquidationAmount > collateral) {
    const liquidationDelta = liquidationAmount - collateral
    const priceDelta = (liquidationDelta * averagePrice) / size

    return isLong ? averagePrice + priceDelta : averagePrice - priceDelta
  }

  const liquidationDelta = collateral - liquidationAmount
  const priceDelta = (liquidationDelta * averagePrice) / size

  return isLong ? averagePrice - priceDelta : averagePrice + priceDelta
}

function getMarginFee(sizeDelta: bigint) {
  if (!sizeDelta) {
    return 0n
  }
  const afterFeeUsd =
    (sizeDelta * BigInt(BASIS_POINTS_DIVISOR - MARGIN_FEE_BASIS_POINTS)) /
    BigInt(BASIS_POINTS_DIVISOR)
  return sizeDelta - afterFeeUsd
}

export function getLiquidationPrice(
  isLong: boolean,
  size: bigint,
  collateral: bigint,
  averagePrice: bigint,
  collateralDelta: bigint,
  increaseCollateral: boolean
) {
  if (!size || !collateral || !averagePrice) {
    return
  }

  let nextSize = size ? size : 0n
  let remainingCollateral = collateral

  if (collateralDelta) {
    if (increaseCollateral) {
      remainingCollateral = remainingCollateral + collateralDelta
    } else {
      if (collateralDelta >= remainingCollateral) {
        return
      }
      remainingCollateral = remainingCollateral - collateralDelta
    }
  }

  let positionFee = getMarginFee(size) + BigInt(LIQUIDATION_FEE)

  const liquidationPriceForFees = getLiquidationPriceFromDelta(
    positionFee,
    nextSize,
    remainingCollateral,
    averagePrice,
    isLong
  )

  const liquidationPriceForMaxLeverage = getLiquidationPriceFromDelta(
    (nextSize * BigInt(BASIS_POINTS_DIVISOR)) / BigInt(MAX_LEVERAGE),
    nextSize,
    remainingCollateral,
    averagePrice,
    isLong
  )

  if (!liquidationPriceForFees) {
    return liquidationPriceForMaxLeverage
  }

  if (!liquidationPriceForMaxLeverage) {
    return liquidationPriceForFees
  }

  if (isLong) {
    // return the higher price
    return liquidationPriceForFees > liquidationPriceForMaxLeverage
      ? liquidationPriceForFees
      : liquidationPriceForMaxLeverage
  }

  // return the lower price
  return liquidationPriceForFees < liquidationPriceForMaxLeverage
    ? liquidationPriceForFees
    : liquidationPriceForMaxLeverage
}
