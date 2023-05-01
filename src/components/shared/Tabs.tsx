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
  size?: 'xs' | 'sm' | 'md' | 'lg'
  style?: 'normal' | 'monochromatic' | 'no-style' | 'custom-color'
  roundStyle?: 'round' | 'straight' | 'folder' | 'separate'
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
        className={clsx('flex w-full ', {
          'gap-[5px]': roundStyle === 'separate',
          'gap-[2px] rounded': roundStyle === 'round',
          'gap-[2px] rounded-none': roundStyle === 'straight',
          'bg-inherit gap-[2px]': style === 'no-style',
        })}
      >
        {tabList.map((item) => (
          <Tab as={Fragment} key={item.key}>
            <button
              disabled={item.isDisabled}
              onClick={item.action}
              className={clsx(
                'ring-white transition duration-500 focus:outline-none',
                'w-full font-medium',
                'ui-not-selected:bg-transparent ',

                {
                  'px-1 py-1.5 text-xs': size === 'xs',
                  'px-3 py-1.5 text-sm': size === 'sm',
                  'px-5 py-2 text-xs': size === 'md',
                  'px-6 py-3': size === 'lg',
                },
                {
                  '  ui-selected:bg-primary ui-selected:text-gray-600 ui-not-selected:bg-gray-500 ui-not-selected:text-gray-300 ui-not-selected:hover:bg-gray-400':
                    style === 'normal',
                  'ring-gray-500 ui-selected:bg-gray-600':
                    style === 'monochromatic',
                  'ui-selected:text-white ui-not-selected:text-gray-300':
                    style === 'no-style',
                },

                {
                  ' text-white ui-not-selected:bg-gray-500':
                    style === 'custom-color',
                  ' ui-selected:bg-red-400':
                    style === 'custom-color' && item.bgColor === 'red',
                  ' ui-selected:bg-green-400':
                    style === 'custom-color' && item.bgColor === 'green',
                },
                {
                  'ui-not-selected:bg-gray-600 ui-not-selected:text-gray-500 ui-not-selected:hover:bg-gray-600':
                    item.isDisabled,
                },
                {
                  'first:rounded-l-md last:rounded-r-md ':
                    roundStyle === 'round',
                  ' rounded  ui-not-selected:bg-gray-600':
                    roundStyle === 'separate',
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

export default Tabs
