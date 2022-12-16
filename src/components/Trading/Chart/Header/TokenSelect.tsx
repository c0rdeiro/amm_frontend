import { tokens } from '@/constants'
import tokenIcon from '@/hooks/tokenIcon'
import { useToken, useTokenActions } from '@/store/tokenStore'
import formatNumber from '@/utils/formatNumber'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const TokenSelect: React.FC = () => {
  const token = useToken()
  const { setToken } = useTokenActions()

  const log = (e: any) => {
    console.log(e)
  }
  return (
    <div className="flex flex-row items-start gap-2 text-2.5xl font-semibold">
      {tokenIcon(token.label, 36)}
      <Listbox value={token.label} onChange={log}>
        <Listbox.Button className="flex flex-row items-center gap-1">
          {token.label} <MdOutlineKeyboardArrowDown size="1.5rem" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="text-text-default absolute mt-10 ml-10 min-w-min gap-4 overflow-auto rounded-lg bg-white py-4 pl-2 pr-4 text-base font-medium shadow-dark focus:outline-none">
            {tokens
              .filter((item) => item.label !== token.label)
              .map((item) => (
                <Listbox.Option
                  key={item.label}
                  value={item}
                  onClick={() => setToken(item)}
                  className="flex gap-2 px-2 py-2 hover:cursor-pointer"
                >
                  {tokenIcon(item.label, 20)}
                  {item.label}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
      <div className="flex flex-row">
        {formatNumber(token.price, {
          decimalCases: 2,
          symbol: token.priceCurrency,
        })}
      </div>
    </div>
  )
}

export default TokenSelect
