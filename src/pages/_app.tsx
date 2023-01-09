import Layout from '@/components/Layout'
import { CustomPage } from '@/types/next'
import { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'

import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WalletProvider from '@/providers/WalletProvider'

interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage
}
const queryClient = new QueryClient()

const IVX = ({ Component, pageProps: { ...pageProps } }: CustomAppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Layout fullPage={Component.fullPage} title={Component.title}>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </QueryClientProvider>
  )
}

export default IVX
