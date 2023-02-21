import { OptionType } from '@/types/next'
import filterNulls from '@/utils/filterNulls'
import getIsQuoteHidden from '@/utils/getIsQuoteHidden'
import resolveOptions from '@/utils/resolveOptions'
import { BigNumber } from '@ethersproject/bignumber'
import { BoardQuotes, Market, StrikeQuotes } from '@lyrafinance/lyra-js'
import { formatEther } from 'ethers/lib/utils.js'

export async function getTokenOptions(
  symbol: string | undefined,
  market: Market | undefined,
  boardQuotes: BoardQuotes | undefined,
  isCall: boolean,
  isSell: boolean
): Promise<OptionType[]> {
  if (!market || !symbol || !boardQuotes) return Promise.reject('invalid')

  const filteredQuotes = await (
    await market
      ?.liveBoard(boardQuotes?.board.id)
      .quoteAll(BigNumber.from(1).mul(BigNumber.from(10).pow(18)), {
        iterations: 3,
      })
  ).strikes.map(({ callBid, callAsk, putBid, putAsk, strike }) => ({
    callBid: !getIsQuoteHidden(callBid.disabledReason) ? callBid : null,
    callAsk: !getIsQuoteHidden(callAsk.disabledReason) ? callAsk : null,
    putBid: !getIsQuoteHidden(putBid.disabledReason) ? putBid : null,
    putAsk: !getIsQuoteHidden(putAsk.disabledReason) ? putAsk : null,
    strike,
  }))

  const simpleQuotes = filteredQuotes
    .map(({ strike, callBid, callAsk, putBid, putAsk }) => {
      const bid = isCall ? callBid : putBid
      const ask = isCall ? callAsk : putAsk
      const option = strike.option(isCall)
      return {
        bid,
        ask,
        option,
        strikePrice: parseFloat(formatEther(strike.strikePrice)),
      }
    })
    .filter(({ bid, ask }) => !!bid || !!ask)
    .sort((a, b) => a.strikePrice - b.strikePrice)

  return filterNulls(
    simpleQuotes.map((quote) => resolveOptions(quote, isCall, isSell))
  )
}
