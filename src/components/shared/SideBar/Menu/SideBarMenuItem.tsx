import { MenuLinkType } from '@/types/next'
import Link from 'next/link'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

type SideBarMenuItemProps = {
  menuLink: MenuLinkType
}

const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({
  menuLink,
}: SideBarMenuItemProps) => {
  const router = useRouter()

  return (
    <Link href={`/${menuLink.link}`}>
      <div
        className={clsx(
          'text-text-default flex flex-row items-center gap-4 py-3 font-medium ',
          {
            'text-primary': router.asPath.split('/')[1] === menuLink.link,
            'hover:text-primary/[.6]':
              router.asPath.split('/')[1] !== menuLink.link,
          }
        )}
      >
        {menuLink.icon}
        <div className="">{menuLink.label}</div>
      </div>
    </Link>
  )
}

export default SideBarMenuItem
