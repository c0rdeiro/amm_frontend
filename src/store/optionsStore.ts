import { OptionType } from '@/types/next'
import create from 'zustand'

type OptionsStore = {
  option: OptionType | null
  isSell: boolean
  isCall: boolean
  actions: {
    setSelectedOption: (option: OptionType) => void
    clearOption: () => void
    setIsSell: (isSell: boolean) => void
    setIsCall: (isCall: boolean) => void
  }
}

const useOptionsStore = create<OptionsStore>((set) => ({
  option: null,
  isSell: false,
  isCall: true,
  actions: {
    setSelectedOption: (option: OptionType) => set(() => ({ option })),
    clearOption: () => set(() => ({ option: null })),
    setIsSell: (isSell: boolean) => set(() => ({ isSell, option: null })),
    setIsCall: (isCall: boolean) => set(() => ({ isCall, option: null })),
  },
}))

export const useSelectedOption = () => useOptionsStore((state) => state.option)
export const useIsOptionSell = () => useOptionsStore((state) => state.isSell)
export const useIsOptionCall = () => useOptionsStore((state) => state.isCall)
export const useOptionsActions = () => useOptionsStore((state) => state.actions)
