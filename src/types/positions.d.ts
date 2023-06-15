type Token = {
  name: string
  symbol: string
  baseSymbol?: string
  decimals?: number
  address?: string
  coingeckoUrl?: string
  imageUrl?: string

  isUsdg?: boolean
  isNative?: boolean
  isWrapped?: boolean
  isShortable?: boolean
  isStable?: boolean
  isTempHidden?: boolean
}

type Position = {
  id: number
  token: Token
  operation: 'Call' | 'Put'
  strategy: 'Long' | 'Short'
  strike: bigint
  expiryTime: number
  premium: bigint
  size: bigint
  pnl: bigint
  unrealisedPnl: bigint
  totalFees: bigint
  markPrice: bigint
  entryPrice: bigint
  liqPrice: bigint
  collateral: bigint
  collateralToken: Token
  openTimestamp: number
  leverage: bigint
  leverageStr: string
  isClosed: boolean
  closeTimestamp?: number
  closePrice?: bigint
}

type IVXPositionType = Position & {
  costPerOption: number
  price: number
  breakeven: bigint
  profit: number
}

type GMXPosition = Position & {
  contractKey?: string
  averagePrice: bigint
  entryFundingRate: bigint
  cumulativeFundingRate: bigint
  hasRealisedProfit: boolean
  lastIncreasedTime: number
  hasProfit: boolean
  delta: bigint
  fundingFee: bigint
  collateralAfterFee: bigint
  closingFee: bigint
  positionFee: bigint
  pendingDelta: bigint
  hasLowCollateral: boolean
  deltaPercentage: bigint
  deltaStr: string
  deltaPercentageStr: string
  deltaBeforeFeesStr: string
  hasProfitAfterFees: boolean
  pendingDeltaAfterFees: bigint
  deltaPercentageAfterFees: bigint
  deltaAfterFeesStr: string
  deltaAfterFeesPercentageStr: string
  netValue: bigint
}
