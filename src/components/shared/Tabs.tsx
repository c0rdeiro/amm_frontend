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
  roundStyle?: 'round' | 'straight'
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
            'bg-inherit': style === 'no-style',
            'bg-gray-400 dark:bg-darkSecondary': style !== 'no-style',
          },
          'flex w-full'
        )}
      >
        {tabList.map((item) => (
          <Tab as={Fragment} key={item.key}>
            <button
              onClick={item.action}
              className={clsx(
                {
                  'px-3 py-1.5 text-sm': size === 'sm',
                  'px-3 py-1.5': size === 'md',
                  'px-6 py-3': size === 'lg',
                },
                {
                  'ui-selected:bg-primary ui-selected:shadow-blue':
                    style === 'normal',
                  'ui-selected:bg-text-gray dark:ui-selected:bg-darkBg':
                    style === 'monochromatic',
                  'ui-selected:text-text-DEFAULT dark:ui-selected:text-white':
                    style === 'no-style',
                  ' ui-selected:text-white ': style !== 'no-style',
                },
                'w-full rounded-lg font-medium',

                'ui-not-selected:bg-transparent ui-not-selected:text-text-purple ui-not-selected:hover:text-text-gray',
                'ring-white  focus:outline-none'
              )}
            >
              <span className="flex w-full items-center justify-center gap-1 ">
                {item.label}
                {item.icon}
              </span>
            </button>
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}

export default Tabs
