import useBreakpoints from '@/hooks/useBreakpoints'
import Head from 'next/head'
import Header from './Header'
import SideBar from './shared/SideBar/SideBar'

interface LayoutProps {
  fullPage: boolean
  title: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLg, active, isMd, isSm, isXl } = useBreakpoints()

  return (
    <>
      <Head>
        <title>{`IVX`}</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </Head>
      {isXl ? (
        <div className="flex h-screen min-h-screen flex-col overflow-hidden">
          <Header />
          <div className="flex h-full w-full  flex-row bg-gray-400">
            <SideBar />
            <main className="w-[85%] grow  bg-gray-100">{children}</main>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          please open the application on a desktop, mobile coming soon
        </div>
      )}
    </>
  )
}

export default Layout
