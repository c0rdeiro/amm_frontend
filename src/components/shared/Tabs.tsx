import { TabType } from '@/types/next'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

type ControllingTab = {
  currentTab: number
  setCurrentTab: (tab: number) => void
}

type TabsProps = {
  tabList: TabType[]
  size?: 'sm' | 'md' | 'lg'
  style?: 'normal' | 'monochromatic' | 'no-style'
  roundStyle?: 'round' | 'straight' | 'folder'
  defaultIndex?: number
  controllingTab?: ControllingTab
}

const Tabs: React.FC<TabsProps> = ({
  tabList,
  size = 'md',
  style = 'normal',
  roundStyle = 'round',
  defaultIndex = 0,
  controllingTab,
}: TabsProps) => {
  return (
    <Tab.Group
      defaultIndex={defaultIndex}
      selectedIndex={controllingTab ? controllingTab.currentTab : undefined}
      onChange={controllingTab ? controllingTab.setCurrentTab : undefined}
    >
      <Tab.List
        className={clsx(
          {
            'rounded-lg': roundStyle === 'round',
            'rounded-none': roundStyle === 'straight',
            'rounded-lg bg-gray-600': roundStyle === 'folder',
            'bg-inherit': style === 'no-style',
          },
          'flex w-full gap-[2px]'
        )}
      >
        {tabList.map((item) => (
          <Tab as={Fragment} key={item.key}>
            <button
              onClick={item.action}
              className={clsx(
                'ring-white focus:outline-none',
                'w-full font-medium',
                'ui-not-selected:bg-transparent',
                {
                  'px-3 py-1.5 text-sm': size === 'sm',
                  'px-5 py-2 text-xs': size === 'md',
                  'px-6 py-3': size === 'lg',
                },
                {
                  'first:rounded-l-md last:rounded-r-md ui-selected:bg-primary ui-selected:text-gray-600 ui-not-selected:bg-gray-500 ui-not-selected:text-gray-300':
                    style === 'normal',
                  'ring-gray-500 ui-selected:bg-gray-600':
                    style === 'monochromatic',
                  'ui-selected:text-white ui-not-selected:text-gray-300':
                    style === 'no-style',
                }
              )}
            >
              <span className="flex w-full items-center justify-center gap-2 ">
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

export default Tabs
