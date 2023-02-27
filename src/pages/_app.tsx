import Layout from '@/components/Layout'
import { CustomPage } from '@/types/next'
import { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'

import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WalletSessionProvider from '@/providers/WalletSessionProvider'

interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage
}
const queryClient = new QueryClient()

const IVX = ({ Component, pageProps: { ...pageProps } }: CustomAppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletSessionProvider>
        <Layout fullPage={Component.fullPage} title={Component.title}>
          <Component {...pageProps} />
        </Layout>
      </WalletSessionProvider>
    </QueryClientProvider>
  )
}

export default IVX
