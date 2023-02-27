import {
  RainbowKitProvider,
  connectorsForWallets,
  Wallet,
} from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'

type WalletProviderProps = {
  children: React.ReactNode
}

const throwError = (message: string) => {
  throw new Error(message)
}

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
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default WalletSessionProvider
