import {
  connectorsForWallets,
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import tailwindConfig from 'tailwind.config.cjs'
import resolveConfig from 'tailwindcss/resolveConfig'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, bsc } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

type WalletProviderProps = {
  children: React.ReactNode
}

// const throwError = (message: string) => {
//   throw new Error(message)
// }

const WalletSessionProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { chains, publicClient } = configureChains(
    [arbitrum, bsc],
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

  const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
    connectors,
  })
  const tw = resolveConfig(tailwindConfig)

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        coolMode
        chains={chains}
        theme={darkTheme({
          accentColor: tw.theme.colors.primary,
          accentColorForeground: tw.theme.colors.gray[700],
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default WalletSessionProvider
