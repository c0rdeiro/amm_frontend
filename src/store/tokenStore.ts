import { create } from 'zustand'
import { OhlcData, TimeRange } from 'lightweight-charts'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'
import { CandlesIntervals, Market, TokenInfoType } from '@/types/next'
import { markets } from '@/constants'

type TokenStore = {
  market: Market
  tokenAddress: string
  tokenPrice: number | undefined
  graphVisibleRange: TimeRange
  candlesInterval: CandlesIntervals
  chartHoverInfo: TokenInfoType[] | null
  actions: {
    setMarket: (market: Market) => void
    setTokenAddress: (tokenAddress: string) => void
    setTokenPrice: (tokenPrice: number) => void
    setGraphVisibleRange: (range: TimeRange) => void
    setCandlesInterval: (candlesInterval: CandlesIntervals) => void
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) => void
    clearChartHoverInfo: () => void
  }
}

const useTokenStore = create<TokenStore>((set) => ({
  market: markets[0] ?? { symbol: 'ETHUSDT', label: 'ETH' },
  tokenAddress: '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15',
  tokenPrice: undefined,
  chartHoverInfo: null,
  graphVisibleRange: getTimeRangeFromDays(1),
  candlesInterval: '15m',
  actions: {
    setMarket: (market: Market) =>
      set(() => ({ market, tokenPrice: undefined })),
    setTokenAddress: (tokenAddress: string) => set(() => ({ tokenAddress })),
    setTokenPrice(tokenPrice) {
      // console.log('SET PRICE', tokenPrice)

      set(() => ({ tokenPrice }))
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

export const useMarket = () => useTokenStore((state) => state.market)
export const useTokenAddress = () =>
  useTokenStore((state) => state.tokenAddress)
export const useTokenPrice = () => useTokenStore((state) => state.tokenPrice)
export const useTokenChartHoverInfo = () =>
  useTokenStore((state) => state.chartHoverInfo)
export const useCandlesInterval = () =>
  useTokenStore((state) => state.candlesInterval)
export const useGraphVisibleRange = () =>
  useTokenStore((state) => state.graphVisibleRange)
export const useTokenActions = () => useTokenStore((state) => state.actions)
