type GMXPosition = {
  key: string
  contractKey?: string
  collateralToken: GMXToken
  indexToken: GMXToken
  isLong: boolean
  size: BigNumber
  collateral: BigNumber
  averagePrice: BigNumber
  entryFundingRate: BigNumber
  cumulativeFundingRate: BigNumber
  hasRealisedProfit: boolean
  realisedPnl: BigNumber
  lastIncreasedTime: number
  hasProfit: boolean
  delta: BigNumber
  markPrice: BigNumber
  fundingFee: BigNumber
  collateralAfterFee: BigNumber
  closingFee: BigNumber
  positionFee: BigNumber
  totalFees: BigNumber
  pendingDelta: BigNumber
  hasLowCollateral: boolean
  deltaPercentage: BigNumber
  deltaStr: string
  deltaPercentageStr: string
  deltaBeforeFeesStr: string
  hasProfitAfterFees: boolean
  pendingDeltaAfterFees: BigNumber
  deltaPercentageAfterFees: BigNumber
  deltaAfterFeesStr: string
  deltaAfterFeesPercentageStr: string
  netValue: BigNumber
  leverage: BigNumber
  leverageStr: string

  //TODO: check these 2 fields
  entryPrice: BigNumber
  liqPrice: BigNumber
}

type GMXToken = {
  name: string
  symbol: string
  baseSymbol?: string
  decimals: number
  address: string
  coingeckoUrl?: string
  imageUrl?: string

  isUsdg?: boolean
  isNative?: boolean
  isWrapped?: boolean
  isShortable?: boolean
  isStable?: boolean
  isTempHidden?: boolean
}
