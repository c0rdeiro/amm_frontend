import Market from './Market/Market'
import SideBarMenu from './Menu/SideBarMenu'

const SideBar: React.FC = () => {
  return (
    <nav className="z-20 flex min-h-full w-72 flex-initial flex-col items-center gap-20 bg-gray-100 px-4 pt-16 shadow-dark 2xl:px-6">
      <SideBarMenu />
      <Market />
    </nav>
  )
}

export default SideBar
