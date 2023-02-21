import { SelectItem } from '@/components/shared/Form/Select'
import { OptionType } from '@/types/next'
import { BoardQuotes } from '@lyrafinance/lyra-js'
import create from 'zustand'

type OptionsStore = {
  option: OptionType | null
  isSell: boolean
  isCall: boolean
  expDate: SelectItem<BoardQuotes> | null
  actions: {
    setSelectedOption: (option: OptionType) => void
    clearOption: () => void
    setIsSell: (isSell: boolean) => void
    setIsCall: (isCall: boolean) => void
    setExpDate: (expDate: SelectItem<BoardQuotes>) => void
  }
}

const useOptionsStore = create<OptionsStore>((set) => ({
  option: null,
  isSell: false,
  isCall: true,
  expDate: null,
  actions: {
    setSelectedOption: (option: OptionType) => {
      if (useOptionsStore.getState().option?.id === option.id)
        set(() => ({ option: null }))
      else set(() => ({ option }))
    },
    clearOption: () => set(() => ({ option: null })),
    setIsSell: (isSell: boolean) => set(() => ({ isSell, option: null })),
    setIsCall: (isCall: boolean) => set(() => ({ isCall, option: null })),
    setExpDate: (expDate: SelectItem<BoardQuotes>) =>
      set(() => ({ expDate, option: null })),
  },
}))

export const useSelectedOption = () => useOptionsStore((state) => state.option)
export const useIsOptionSell = () => useOptionsStore((state) => state.isSell)
export const useIsOptionCall = () => useOptionsStore((state) => state.isCall)
export const useOptionExpDate = () => useOptionsStore((state) => state.expDate)
export const useOptionsActions = () => useOptionsStore((state) => state.actions)
