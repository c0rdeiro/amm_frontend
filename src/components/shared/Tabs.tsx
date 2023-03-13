import { TabType } from '@/types/next'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

type TabsProps = {
  tabList: TabType[]
  size?: 'md' | 'lg'
  defaultIndex?: number
}

const Tabs: React.FC<TabsProps> = ({
  tabList,
  size = 'md',
  defaultIndex = 0,
}: TabsProps) => {
  return (
    <Tab.Group defaultIndex={defaultIndex}>
      <Tab.List className="flex w-full rounded-lg bg-gray-400">
        {tabList.map((item) => (
          <Tab as={Fragment} key={item.label}>
            {({ selected }) => (
              <button
                onClick={item.action}
                className={clsx(
                  { 'px-3 py-1.5': size === 'md', 'px-6 py-3': size === 'lg' },
                  'w-full rounded-lg font-medium',
                  'ui-selected:bg-primary ui-selected:text-white ui-selected:shadow-blue',
                  'ui-not-selected:bg-transparent ui-not-selected:text-text-purple ui-not-selected:hover:text-primary/[.6]',
                  ' ring-white  focus:outline-none'
                )}
              >
                <span className="flex w-full items-center justify-center gap-1 ">
                  {item.label}
                  {item.icon}
                </span>
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}

export default Tabs
