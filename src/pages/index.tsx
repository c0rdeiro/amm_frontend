import { CustomPage } from '@/types/next'

const Home: CustomPage = () => {
  return <div className="flex items-center justify-center">Main</div>
}

Home.fullPage = true
Home.title = 'Home'

export default Home
