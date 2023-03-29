import { create } from 'zustand'
import { TimeRange } from 'lightweight-charts'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'
import { SupportedMarket, TokenInfoType } from '@/types/next'

type TokenStore = {
  marketToken: SupportedMarket
  tokenAddress: string
  graphVisibleRange: TimeRange
  chartHoverInfo: TokenInfoType[] | null
  actions: {
    setMarketToken: (marketToken: SupportedMarket) => void
    setTokenAddress: (tokenAddress: string) => void
    setGraphVisibleRange: (range: TimeRange) => void
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) => void
    clearChartHoverInfo: () => void
  }
}

const useTokenStore = create<TokenStore>((set) => ({
  marketToken: 'ETHUSDT',
  tokenAddress: '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15',
  chartHoverInfo: null,
  graphVisibleRange: getTimeRangeFromDays(1),
  actions: {
    setMarketToken: (marketToken: SupportedMarket) =>
      set(() => ({ marketToken })),
    setTokenAddress: (tokenAddress: string) => set(() => ({ tokenAddress })),
    setGraphVisibleRange: (range: TimeRange) =>
      set(() => ({ graphVisibleRange: range })),
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) =>
      set(() => ({ chartHoverInfo })),
    clearChartHoverInfo: () => set(() => ({ chartHoverInfo: null })),
  },
}))

export const useMarketToken = () => useTokenStore((state) => state.marketToken)
export const useTokenAddress = () =>
  useTokenStore((state) => state.tokenAddress)
export const useTokenChartHoverInfo = () =>
  useTokenStore((state) => state.chartHoverInfo)
export const useGraphVisibleRange = () =>
  useTokenStore((state) => state.graphVisibleRange)
export const useTokenActions = () => useTokenStore((state) => state.actions)
