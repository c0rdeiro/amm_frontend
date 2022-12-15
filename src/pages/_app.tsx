import Layout from '@/components/Layout'
import { CustomPage } from '@/types/next'
import { AppProps } from 'next/app'

import '@/styles/globals.css'

interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: CustomPage
}

const IVX = ({ Component, pageProps: { ...pageProps } }: CustomAppProps) => {
  return (
    <Layout fullPage={Component.fullPage} title={Component.title}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default IVX
