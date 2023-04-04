import Spinner from '@/components/shared/Spinner'
import { markets } from '@/constants'
import tokenIcon from '@/hooks/tokenIcon'
import { useMarket, useTokenActions, useTokenPrice } from '@/store/tokenStore'
import formatNumber from '@/utils/formatNumber'
import { Listbox, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment, Suspense } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const TokenSelect: React.FC = () => {
  const { setMarket: setMarket } = useTokenActions()
  const router = useRouter()
  const market = useMarket()
  const tokenPrice = useTokenPrice()

  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex flex-row items-start gap-2 text-2xl font-semibold xl:text-2.5xl">
        {market ? tokenIcon(market, 36) : undefined}
        <Listbox value={market.symbol}>
          <Listbox.Button className="flex flex-row items-center gap-1">
            {market.label} <MdOutlineKeyboardArrowDown size="1.5rem" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="text-text-default absolute mt-10 ml-10 min-w-min gap-4 overflow-auto rounded-lg bg-white py-4 pl-2 pr-4 text-base font-medium shadow-dark focus:outline-none dark:bg-darkSecondary dark:text-white dark:shadow-none">
              {markets?.map((item, idx) => (
                <Listbox.Option
                  key={idx}
                  value={item}
                  onClick={() => {
                    router.push(`/trading/${item.label.toLowerCase()}`)
                    setMarket(item)
                  }}
                  className="flex items-center gap-2 px-2 py-2 hover:cursor-pointer"
                >
                  {tokenIcon(item, 20)}
                  {item.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
        <div className="flex flex-row">
          {tokenPrice ? (
            formatNumber(tokenPrice, {
              decimalCases: 2,
              symbol: '$',
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </Suspense>
  )
}

export default TokenSelect
