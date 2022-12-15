import { TabType } from '@/types/next'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

type TabsProps = {
  tabList: TabType[]
  defaultIndex?: number
}

const Tabs: React.FC<TabsProps> = ({
  tabList,
  defaultIndex = 0,
}: TabsProps) => {
  return (
    <Tab.Group defaultIndex={defaultIndex}>
      <Tab.List className="rounded-lg bg-gray-400">
        {tabList.map((item) => (
          <Tab as={Fragment} key={item.label}>
            {({ selected }) => (
              <button
                onClick={item.action}
                className={clsx(
                  '  rounded-lg py-1.5 px-3 font-medium',
                  'ui-selected:bg-primary ui-selected:text-white ui-selected:shadow-blue',
                  'ui-not-selected:bg-transparent ui-not-selected:text-text-purple ui-not-selected:hover:text-primary/[.6]',
                  ' ring-white  focus:outline-none'
                )}
              >
                <span className="flex items-center gap-1">
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
