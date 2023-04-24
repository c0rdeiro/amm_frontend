import Layout from '@/components/Layout'
import { CustomPage } from '@/types/next'
import { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'

import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WalletSessionProvider from '@/providers/WalletSessionProvider'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage
}
const queryClient = new QueryClient()

const apolloClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/0xnexusflip/arbi-chainlink-eth-usd',
  cache: new InMemoryCache(),
})

const IVX = ({ Component, pageProps: { ...pageProps } }: CustomAppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <WalletSessionProvider>
          <Layout fullPage={Component.fullPage} title={Component.title}>
            <Component {...pageProps} />
          </Layout>
        </WalletSessionProvider>
      </QueryClientProvider>
    </ApolloProvider>
  )
}

export default IVX
