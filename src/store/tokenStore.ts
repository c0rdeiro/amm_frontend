import { create } from 'zustand'
import { OhlcData, TimeRange } from 'lightweight-charts'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'
import { CandlesIntervals, SupportedMarket, TokenInfoType } from '@/types/next'

type TokenStore = {
  marketToken: SupportedMarket
  tokenAddress: string
  tokenOHLCV: OhlcData & { volume: number }
  graphVisibleRange: TimeRange
  candlesInterval: CandlesIntervals
  chartHoverInfo: TokenInfoType[] | null
  actions: {
    setMarketToken: (marketToken: SupportedMarket) => void
    setTokenAddress: (tokenAddress: string) => void
    setTokenOhlcv: (
      tokenOHLCV: (OhlcData & { volume: number }) | undefined
    ) => void
    setGraphVisibleRange: (range: TimeRange) => void
    setCandlesInterval: (candlesInterval: CandlesIntervals) => void
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) => void
    clearChartHoverInfo: () => void
  }
}

const useTokenStore = create<TokenStore>((set) => ({
  marketToken: 'ETHUSDT',
  tokenAddress: '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15',
  tokenOHLCV: {} as OhlcData & { volume: number },
  chartHoverInfo: null,
  graphVisibleRange: getTimeRangeFromDays(1),
  candlesInterval: '15m',
  actions: {
    setMarketToken: (marketToken: SupportedMarket) =>
      set(() => ({ marketToken })),
    setTokenAddress: (tokenAddress: string) => set(() => ({ tokenAddress })),
    setTokenOhlcv(tokenOHLCV) {
      set(() => ({ tokenOHLCV }))
    },
    setGraphVisibleRange: (range: TimeRange) =>
      set(() => ({ graphVisibleRange: range })),
    setCandlesInterval: (candlesInterval: CandlesIntervals) =>
      set(() => ({ candlesInterval })),
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) =>
      set(() => ({ chartHoverInfo })),
    clearChartHoverInfo: () => set(() => ({ chartHoverInfo: null })),
  },
}))

export const useMarketToken = () => useTokenStore((state) => state.marketToken)
export const useTokenAddress = () =>
  useTokenStore((state) => state.tokenAddress)
export const useTokenOhlcv = () => useTokenStore((state) => state.tokenOHLCV)
export const useTokenChartHoverInfo = () =>
  useTokenStore((state) => state.chartHoverInfo)
export const useCandlesInterval = () =>
  useTokenStore((state) => state.candlesInterval)
export const useGraphVisibleRange = () =>
  useTokenStore((state) => state.graphVisibleRange)
export const useTokenActions = () => useTokenStore((state) => state.actions)
