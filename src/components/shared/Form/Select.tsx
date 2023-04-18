import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Switch from './Switch'

export type SelectItem<T> = {
  label: string
  value: T
  isDisabled?: boolean
}

type SelectProps<T> =
  | {
      items: SelectItem<T>[]
      selectedItem: SelectItem<T> | undefined | null
      setSelectedItem: (arg: SelectItem<T>) => void
      isDisabled?: boolean
      style?: 'normal' | 'no-style'
    }
  | {
      items: SelectItem<T>[]
      selectedItem: SelectItem<T>[] | undefined | null
      setSelectedItem: (arg: SelectItem<T>[]) => void
      isDisabled?: boolean
      style?: 'normal' | 'no-style'
    }

function Select<T>({
  items,
  selectedItem,
  setSelectedItem,
  isDisabled = false,
  style = 'normal',
}: SelectProps<T>) {
  const multiple = Array.isArray(selectedItem)
  return (
    <div className="relative">
      <Listbox
        value={selectedItem}
        onChange={setSelectedItem}
        multiple={multiple}
        disabled={isDisabled}
      >
        <Listbox.Button
          className={clsx('relative flex h-12 items-center gap-2 font-medium', {
            'bg-gray-300': isDisabled,
            'dark:hover:bg-darkBg rounded-lg border border-solid border-input-border bg-white px-4 py-2 dark:bg-darkSecondary':
              style === 'normal',
            'bg-inherit text-sm font-normal text-gray-300':
              style === 'no-style',
          })}
        >
          {Array.isArray(selectedItem)
            ? selectedItem.map((item) => item.label).join(', ')
            : selectedItem?.label}
          <MdOutlineKeyboardArrowDown size="1.5rem" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-100 mt-1 flex flex-col gap-2 overflow-visible rounded border border-gray-500 bg-gray-600 p-2 text-sm font-medium focus:outline-none">
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
