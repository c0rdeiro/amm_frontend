import { markets } from '@/constants'
import { CandlesIntervals, Market, TokenInfoType } from '@/types/next'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'
import getVisibleRangeFromCandleInterval from '@/utils/getVisibleRangeFromCandleInterval'
import { TimeRange } from 'lightweight-charts'
import { create } from 'zustand'

type TokenStore = {
  market: Market
  tokenAddress: string
  tokenPrice: number | undefined
  chartVisibleRange: TimeRange
  candlesInterval: {
    value: CandlesIntervals
    label: string
    insideLabel?: string
  }
  chartHoverInfo: TokenInfoType[] | null
  actions: {
    setMarket: (market: Market) => void
    setTokenAddress: (tokenAddress: string) => void
    setTokenPrice: (tokenPrice: number | undefined) => void
    setChartVisibleRange: (range: TimeRange) => void
    setCandlesInterval: (candlesInterval: {
      value: CandlesIntervals
      label: string
      insideLabel?: string
    }) => void
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) => void
    clearChartHoverInfo: () => void
  }
}

const useTokenStore = create<TokenStore>((set) => ({
  market: markets[0] ?? { value: 'ETHUSDT', label: 'ETH' },
  tokenAddress: '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15',
  tokenPrice: undefined,
  chartHoverInfo: null,
  chartVisibleRange: getTimeRangeFromDays(1),
  candlesInterval: {
    value: '15m',
    label: '15m',
    insideLabel: '15 minutes',
  },
  actions: {
    setMarket: (market: Market) =>
      set(() => ({ market, tokenPrice: undefined })),
    setTokenAddress: (tokenAddress: string) => set(() => ({ tokenAddress })),
    setTokenPrice(tokenPrice) {
      set(() => ({ tokenPrice }))
    },
    setChartVisibleRange: (range: TimeRange) =>
      set(() => ({ chartVisibleRange: range })),
    setCandlesInterval: (candlesInterval: {
      value: CandlesIntervals
      label: string
      insideLabel?: string
    }) =>
      set((state) => {
        state.actions.setChartVisibleRange(
          getVisibleRangeFromCandleInterval(candlesInterval.value)
        )
        return { candlesInterval }
      }),
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) =>
      set(() => ({ chartHoverInfo })),
    clearChartHoverInfo: () => set(() => ({ chartHoverInfo: null })),
  },
}))

export const useMarket = () => useTokenStore((state) => state.market)
export const useTokenAddress = () =>
  useTokenStore((state) => state.tokenAddress)
export const useTokenPrice = () => useTokenStore((state) => state.tokenPrice)
export const useTokenChartHoverInfo = () =>
  useTokenStore((state) => state.chartHoverInfo)
export const useCandlesInterval = () =>
  useTokenStore((state) => state.candlesInterval)
export const useChartVisibleRange = () =>
  useTokenStore((state) => state.chartVisibleRange)
export const useTokenActions = () => useTokenStore((state) => state.actions)
