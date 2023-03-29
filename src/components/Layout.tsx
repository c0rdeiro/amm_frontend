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
        <div className="flex h-screen min-h-screen flex-col overflow-hidden">
          <Header />
          <div className="flex h-full w-full  flex-row bg-gray-400 dark:bg-darkBg dark:text-white">
            <main className="w-[85%] grow  bg-gray-100 dark:bg-sectionsBGDark ">
              {children}
            </main>
          </div>
        </div>
      </>
    </>
  )
}

export default Layout
