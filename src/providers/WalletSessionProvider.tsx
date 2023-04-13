import {
  connectorsForWallets,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { useContext } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import { ThemeContext } from './ThemeProvider'

type WalletProviderProps = {
  children: React.ReactNode
}

// const throwError = (message: string) => {
//   throw new Error(message)
// }

const WalletSessionProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { chains, provider } = configureChains(
    [arbitrum],
    [
      // alchemyProvider({
      //   apiKey: process.env.ALCHEMY_ID ?? throwError('Invalid env ALCHEMY_ID'),
      // }),
      publicProvider(),
    ]
  )

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet({ chains })],
    },
  ])

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  const { isDarkTheme } = useContext(ThemeContext)
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        chains={chains}
        theme={isDarkTheme ? darkTheme() : lightTheme()}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default WalletSessionProvider
