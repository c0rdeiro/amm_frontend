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
          className={clsx(
            'relative flex h-12 items-center gap-2 font-medium text-black  dark:text-white',
            {
              'bg-gray-300': isDisabled,
              'rounded-lg border border-solid border-input-border bg-white px-4 py-2 dark:bg-darkSecondary':
                style === 'normal',
              'bg-inherit': style === 'no-style',
            }
          )}
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
          <Listbox.Options className="text-text-default absolute z-50 mt-1 max-h-60 gap-4 overflow-auto rounded-lg bg-white py-4 pl-2 pr-4 text-base font-medium focus:outline-none dark:bg-darkSecondary">
            {items.map((item) => (
              <Listbox.Option
                key={item.label}
                value={item}
                disabled={!!item.isDisabled}
                className=" text-text-purple hover:text-text-gray dark:active:text-white"
              >
                {({ selected }) => (
                  <span
                    className={clsx(
                      'pointer-events-none flex items-center gap-2',
                      {
                        'text-black hover:text-black dark:text-white dark:hover:text-white':
                          Array.isArray(selectedItem)
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
