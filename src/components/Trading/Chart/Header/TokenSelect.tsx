import tokenIcon from '@/hooks/tokenIcon'
import { getTokenBySymbol } from '@/lib/getTokenBySymbol'
import { getTokens } from '@/lib/getTokens'
import { useToken, useTokenActions } from '@/store/tokenStore'
import formatNumber from '@/utils/formatNumber'
import { Listbox, Transition } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { Fragment, Suspense } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const TokenSelect: React.FC = () => {
  const token = useToken()
  const { setToken } = useTokenActions()
  const { data: tokens } = useQuery({
    queryKey: ['tokens'],
    queryFn: getTokens,
    refetchInterval: 5000,
  })

  const { data: selectedToken } = useQuery({
    queryKey: ['selectedToken', token.symbol],
    queryFn: () => getTokenBySymbol(token.symbol),
    refetchInterval: 5000,
  })

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-row items-start gap-2 text-2.5xl font-semibold">
        {selectedToken ? tokenIcon(selectedToken.symbol, 36) : undefined}
        <Listbox value={token.symbol}>
          <Listbox.Button className="flex flex-row items-center gap-1">
            {selectedToken?.symbol} <MdOutlineKeyboardArrowDown size="1.5rem" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="text-text-default absolute mt-10 ml-10 min-w-min gap-4 overflow-auto rounded-lg bg-white py-4 pl-2 pr-4 text-base font-medium shadow-dark focus:outline-none">
              {tokens &&
                tokens
                  .filter((item) => item.symbol !== token.symbol)
                  .map((item, idx) => (
                    <Listbox.Option
                      key={idx}
                      value={item}
                      onClick={() => setToken(item)}
                      className="flex gap-2 px-2 py-2 hover:cursor-pointer"
                    >
                      {tokenIcon(item.symbol, 20)}
                      {item.symbol}
                    </Listbox.Option>
                  ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
        <div className="flex flex-row">
          {selectedToken
            ? formatNumber(selectedToken?.price, {
                decimalCases: 2,
                symbol: '$',
              })
            : undefined}
        </div>
      </div>
    </Suspense>
  )
}

export default TokenSelect
