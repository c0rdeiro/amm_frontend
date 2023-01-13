import Layout from '@/components/Layout'
import { CustomPage } from '@/types/next'
import { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'

import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WalletSessionProvider from '@/providers/WalletSessionProvider'
import { Session } from 'next-auth'

interface CustomAppProps
  extends Omit<
    AppProps<{
      session: Session
    }>,
    'Component'
  > {
  Component: CustomPage
}
const queryClient = new QueryClient()

const IVX = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletSessionProvider session={session}>
        <Layout fullPage={Component.fullPage} title={Component.title}>
          <Component {...pageProps} />
        </Layout>
      </WalletSessionProvider>
    </QueryClientProvider>
  )
}

export default IVX
