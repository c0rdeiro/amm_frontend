import { OptionType } from '@/types/next'
import { Quote, Option } from '@lyrafinance/lyra-js'
import { formatEther } from 'ethers/lib/utils.js'

export default function resolveOptions(
  item: {
    bid: Quote | null
    ask: Quote | null
    option: Option
    strikePrice: number
  },
  isCall: boolean,
  isSell: boolean
): OptionType | null {
  const quote = isSell ? item.bid : item.ask
  if (!quote) {
    return null
  }
  const strike = item.option.strike()
  const strikeId = strike.id

  return {
    id: strikeId.toString(),
    breakEven: parseFloat(formatEther(quote.breakEven)),
    expiryTime: quote.expiryTimestamp * 1000,
    impliedVolatility: parseFloat(formatEther(quote.iv)),
    isCall,
    isSell,
    price: parseFloat(formatEther(quote.pricePerOption)),
    strike: parseFloat(formatEther(quote.strikePrice)),
    toBreakEven: parseFloat(formatEther(quote.toBreakEven)),
  }
}
