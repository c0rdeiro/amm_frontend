import create from 'zustand'
import { TimeRange } from 'lightweight-charts'
import getTimeRangeFromDays from '@/utils/getTimeRangeFromDays'
import { MarketTokenType, TokenInfoType } from '@/types/next'

type TokenStore = {
  // token: MarketTokenType
  graphVisibleRange: TimeRange
  info: TokenInfoType[]
  chartHoverInfo: TokenInfoType[] | null
  actions: {
    // setToken: (token: MarketTokenType) => void
    setGraphVisibleRange: (range: TimeRange) => void
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) => void
    clearChartHoverInfo: () => void
  }
}

const useTokenStore = create<TokenStore>((set) => ({
  // token: {
  //   symbol: 'ETH',
  //   price: 0,
  // },
  info: [
    { label: '24h Change', value: 3.43, type: '%', colorMode: 'redgreen' },
    { label: '24h High', value: 1028.26, type: '$' },
    { label: '24h Low', value: 996.01, type: '$' },
    { label: 'Open Interest', value: 1002.96, type: '$' },
  ],
  chartHoverInfo: null,
  graphVisibleRange: getTimeRangeFromDays(30), //default is 30days
  actions: {
    // setToken: (token: MarketTokenType) => set(() => ({ token })),
    setGraphVisibleRange: (range: TimeRange) =>
      set(() => ({ graphVisibleRange: range })),
    setChartHoverInfo: (chartHoverInfo: TokenInfoType[]) =>
      set(() => ({ chartHoverInfo })),
    clearChartHoverInfo: () => set(() => ({ chartHoverInfo: null })),
  },
}))

// export const useToken = () => useTokenStore((state) => state.token)
export const useTokenInfo = () => useTokenStore((state) => state.info)
export const useTokenChartHoverInfo = () =>
  useTokenStore((state) => state.chartHoverInfo)
export const useGraphVisibleRange = () =>
  useTokenStore((state) => state.graphVisibleRange)
export const useTokenActions = () => useTokenStore((state) => state.actions)
