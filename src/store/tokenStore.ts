import { create } from 'zustand'
import { TimeRange } from 'lightweight-charts'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'
import { MarketTokenType, TokenInfoType } from '@/types/next'

type TokenStore = {
  graphVisibleRange: TimeRange
  chartHoverInfo: TokenInfoType[] | null
  actions: {
    setGraphVisibleRange: (range: TimeRange) => void
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) => void
    clearChartHoverInfo: () => void
  }
}

const useTokenStore = create<TokenStore>((set) => ({
  chartHoverInfo: null,
  graphVisibleRange: getTimeRangeFromDays(1),
  actions: {
    // setToken: (token: MarketTokenType) => set(() => ({ token })),
    setGraphVisibleRange: (range: TimeRange) =>
      set(() => ({ graphVisibleRange: range })),
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) =>
      set(() => ({ chartHoverInfo })),
    clearChartHoverInfo: () => set(() => ({ chartHoverInfo: null })),
  },
}))

export const useTokenChartHoverInfo = () =>
  useTokenStore((state) => state.chartHoverInfo)
export const useGraphVisibleRange = () =>
  useTokenStore((state) => state.graphVisibleRange)
export const useTokenActions = () => useTokenStore((state) => state.actions)
