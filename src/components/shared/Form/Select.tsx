import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Switch from './Switch'

export type SelectItem = {
  label: string
  value: string
  isDisabled?: boolean
}

type SelectProps =
  | {
      items: SelectItem[]
      selectedItem: SelectItem | undefined | null
      setSelectedItem: (arg: SelectItem) => void
    }
  | {
      items: SelectItem[]
      selectedItem: SelectItem[] | undefined | null
      setSelectedItem: (arg: SelectItem[]) => void
    }

const Select: React.FC<SelectProps> = ({
  items,
  selectedItem,
  setSelectedItem,
}) => {
  const multiple = Array.isArray(selectedItem)
  return (
    <div className="relative">
      <Listbox
        value={selectedItem}
        onChange={setSelectedItem}
        multiple={multiple}
      >
        <Listbox.Button className="relative flex h-9 items-center gap-2 rounded-lg border border-solid border-input-border bg-white px-4 py-2 font-medium text-primary">
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
          <Listbox.Options className="text-text-default absolute mt-1 max-h-60 gap-4 overflow-auto rounded-lg bg-white py-4 pl-2 pr-4 text-base font-medium shadow-dark focus:outline-none">
            {items.map((item) => (
              <Listbox.Option
                key={item.label}
                value={item}
                disabled={!!item.isDisabled}
                className="text-text-purple hover:text-primary/[.6] active:text-primary"
              >
                {({ selected }) => (
                  <span
                    className={clsx(
                      'pointer-events-none flex items-center gap-2',
                      {
                        'text-primary': selected,
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
