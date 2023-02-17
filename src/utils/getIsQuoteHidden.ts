import { QuoteDisabledReason } from '@lyrafinance/lyra-js'

const getIsQuoteHidden = (
  disabledReason: QuoteDisabledReason | null
): boolean => {
  if (!disabledReason) return false

  switch (disabledReason) {
    case QuoteDisabledReason.InsufficientLiquidity:
    case QuoteDisabledReason.UnableToHedgeDelta:
      return false
    default:
      return true
  }
}

export default getIsQuoteHidden
