import { TabType } from '@/types/next'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

type TabsProps = {
  tabList: TabType[]
  size?: 'sm' | 'md' | 'lg'
  style?: 'normal' | 'monochromatic' | 'no-style'
  roundStyle?: 'round' | 'straight'
  defaultIndex?: number
}

const Tabs: React.FC<TabsProps> = ({
  tabList,
  size = 'md',
  style = 'normal',
  roundStyle = 'round',
  defaultIndex = 0,
}: TabsProps) => {
  return (
    <Tab.Group defaultIndex={defaultIndex}>
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
            {({ selected }) => (
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
                  },
                  'w-full rounded-lg font-medium',
                  ' ui-selected:text-white ',
                  'ui-not-selected:bg-transparent ui-not-selected:text-text-purple ui-not-selected:hover:text-text-gray',
                  'ring-white  focus:outline-none'
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
