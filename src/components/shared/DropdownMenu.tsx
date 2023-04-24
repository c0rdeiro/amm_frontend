import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'

export type DropdownMenuItem = {
  label: string
  icon?: React.ReactNode
  link: string
  newTab: boolean
  isDisabled?: boolean
}

type DropDownMenuProps = {
  title: string | React.ReactNode
  items: DropdownMenuItem[]
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ title, items }) => {
  return (
    <Menu as="div" className="relative flex items-center">
      <Menu.Button>{title}</Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute top-5 -left-10 flex flex-col gap-2 rounded border border-gray-500 bg-gray-600 p-2">
          {items.map((item) => (
            <Menu.Item key={item.link}>
              {({ active }) => (
                <Link
                  href={item.link}
                  className="flex items-center gap-2 rounded p-2 hover:bg-gray-400"
                  target={item.newTab ? '_blank' : undefined}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
export default DropDownMenu
