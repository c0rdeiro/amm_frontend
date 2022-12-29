import Layout from '@/components/Layout'
import { CustomPage } from '@/types/next'
import { AppProps } from 'next/app'

import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage
}
const queryClient = new QueryClient()

const IVX = ({ Component, pageProps: { ...pageProps } }: CustomAppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout fullPage={Component.fullPage} title={Component.title}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}

export default IVX
