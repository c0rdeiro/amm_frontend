import { MenuLinkType } from '@/types/next'
import SideBarMenuItem from './SideBarMenuItem'
import { TbArrowsCross } from 'react-icons/tb'
import PositionsIcon from '@/Icons/positions'

const SideBarMenu: React.FC = () => {
  const menuLinks: MenuLinkType[] = [
    {
      label: 'Trading',
      link: 'trading',
      icon: <TbArrowsCross size="1.5em" />,
    },
    {
      label: 'Positions',
      link: 'positions',
      icon: <PositionsIcon />,
    },
  ]

  return (
    <div className="flex w-full flex-col items-start gap-2">
      {menuLinks.map((item, index) => (
        <SideBarMenuItem key={index} menuLink={item} />
      ))}
    </div>
  )
}

export default SideBarMenu
