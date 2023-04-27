import { TabType } from '@/types/next'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

type ControllingTab = {
  currentTab: number
  setCurrentTab: (tab: number) => void
}

type FolderTabsProps = {
  tabList: TabType[]
  defaultIndex?: number
  controllingTab?: ControllingTab
}

const FolderTabs: React.FC<FolderTabsProps> = ({
  tabList,
  defaultIndex = 0,
  controllingTab,
}: FolderTabsProps) => {
  return (
    <Tab.Group
      defaultIndex={defaultIndex}
      selectedIndex={controllingTab ? controllingTab.currentTab : undefined}
      onChange={controllingTab ? controllingTab.setCurrentTab : undefined}
    >
      <Tab.List className="flex w-full ">
        {tabList.map((item) => (
          <Tab as={Fragment} key={item.key}>
            <button
              disabled={item.isDisabled}
              onClick={item.action}
              className={clsx(
                'w-full border border-gray-500 py-2 focus-visible:outline-none',
                'ui-selected:rounded-t-lg ui-selected:border-b-0  ui-selected:bg-gray-600',
                'ui-not-selected:mt-1 ',
                {
                  'ui-not-selected:ml-2 ui-not-selected:rounded-tl-lg ui-not-selected:border-r-0':
                    item.key === 0,
                  'ui-not-selected:mr-2 ui-not-selected:rounded-tr-lg ui-not-selected:border-l-0 ':
                    item.key === 1,
                }
              )}
            >
              <span className="flex w-full items-center justify-center gap-2">
                {item.leftIcon}
                {item.label}
                {item.rightIcon}
              </span>
            </button>
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}

export default FolderTabs
