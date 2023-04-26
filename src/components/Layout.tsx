import Head from 'next/head'
import Header from './Header'

interface LayoutProps {
  fullPage: boolean
  title: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>{`IVX`}</title>
        <link rel="icon" href="/IVX_Gradient.svg" type="image/svg+xml"></link>
      </Head>

      <>
        <div className="flex h-screen min-h-screen w-screen flex-col overflow-auto overflow-x-hidden bg-gray-700">
          <Header />
          <main className="flex h-full w-full flex-row items-center justify-center ">
            {children}
          </main>
        </div>
      </>
    </>
  )
}

export default Layout
