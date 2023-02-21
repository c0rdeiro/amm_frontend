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
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth'

type WalletProviderProps = {
  children: React.ReactNode
  session: Session
}

const throwError = (message: string) => {
  throw new Error(message)
}

const WalletSessionProvider: React.FC<WalletProviderProps> = ({
  session,
  children,
}) => {
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
      <SessionProvider session={session} refetchInterval={0}>
        <RainbowKitSiweNextAuthProvider>
          <RainbowKitProvider coolMode chains={chains}>
            {children}
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}

export default WalletSessionProvider
