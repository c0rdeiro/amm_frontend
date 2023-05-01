import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Switch from './Switch'
import { AnimationScope } from 'framer-motion'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind.config.cjs'

export type SelectItem<T> = {
  label: string
  value: T
  icon?: React.ReactNode
  isDisabled?: boolean
}

type SelectProps<T> =
  | {
      items: SelectItem<T>[]
      selectedItem: SelectItem<T> | undefined | null
      setSelectedItem: (arg: SelectItem<T>) => void
      isDisabled?: boolean
      style?: 'normal' | 'no-style'
      size?: 'md' | 'lg'
      textRef?: AnimationScope<any> //used in gmx swap
    }
  | {
      items: SelectItem<T>[]
      selectedItem: SelectItem<T>[] | undefined | null
      setSelectedItem: (arg: SelectItem<T>[]) => void
      isDisabled?: boolean
      style?: 'normal' | 'no-style'
      size?: 'md' | 'lg'
      textRef?: AnimationScope<any> //used in gmx swap
    }

function Select<T>({
  items,
  selectedItem,
  setSelectedItem,
  isDisabled = false,
  style = 'normal',
  textRef,
  size = 'md',
}: SelectProps<T>) {
  const multiple = Array.isArray(selectedItem)
  const tw = resolveConfig(tailwindConfig)
  return (
    <div
      className={clsx('relative', {
        'w-full': size === 'lg',
      })}
    >
      <Listbox
        value={selectedItem}
        onChange={setSelectedItem}
        multiple={multiple}
        disabled={isDisabled}
      >
        <Listbox.Button
          className={clsx('relative flex h-12 items-center gap-2 font-medium', {
            'bg-gray-300': isDisabled,
            'rounded bg-gray-600 px-4 py-2 text-white': style === 'normal',
            'bg-inherit text-sm font-normal text-gray-300':
              style === 'no-style',
            'flex w-full items-center justify-between': size === 'lg',
          })}
        >
          <h4 ref={textRef}>
            {Array.isArray(selectedItem)
              ? selectedItem.map((item) => item.label).join(', ')
              : selectedItem?.label}
          </h4>
          <MdOutlineKeyboardArrowDown
            size="1.5rem"
            color={tw.theme.colors.gray[300]}
          />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-100 mt-1 flex flex-col gap-2 overflow-visible rounded border border-gray-500 bg-gray-600 p-2 text-sm font-medium text-white focus:outline-none">
            {items.map((item) => (
              <Listbox.Option
                key={item.label}
                value={item}
                disabled={!!item.isDisabled}
                className="hover:cursor-pointer hover:rounded hover:bg-gray-400"
              >
                {({ selected }) => (
                  <span
                    className={clsx(
                      'pointer-events-none flex items-center gap-2 rounded p-2 ui-selected:bg-gray-400',
                      {
                        'h-full w-full bg-gray-400': Array.isArray(selectedItem)
                          ? selectedItem
                              .map((x) => x.label)
                              .includes(item.label)
                          : item.label === selectedItem?.label,
                      }
                    )}
                  >
                    {multiple && <Switch enabled={selected} size="sm" />}
                    {item.icon}
                    {item.label}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  )
}

export default Select
