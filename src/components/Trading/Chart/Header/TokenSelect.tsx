import tokenIcon from '@/hooks/tokenIcon'
import formatNumber from '@/utils/formatNumber'
import lyra from '@/utils/getLyraSdk'
import getMarketName from '@/utils/getMarketName'
import { Listbox, Transition } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { formatEther } from 'ethers/lib/utils.js'
import { useRouter } from 'next/router'
import { Fragment, Suspense, useEffect } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const TokenSelect: React.FC = () => {
  const { data: markets } = useQuery({
    queryKey: ['markets'],
    queryFn: async () => await lyra.markets(),
    refetchInterval: 10000,
  })
  const router = useRouter()
  const tokenSymbol = router.asPath.split('/').pop()

  const { data: market } = useQuery({
    queryKey: ['market'],
    queryFn: async () =>
      await lyra.market('0x919E5e0C096002cb8a21397D724C4e3EbE77bC15'), //TODO: change::::this should be a constant
    refetchInterval: 10000,
  })

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-row items-start gap-2 text-2.5xl font-semibold">
        {market ? tokenIcon(market.baseToken.symbol, 36) : undefined}
        <Listbox value={tokenSymbol} disabled={true}>
          <Listbox.Button className="flex flex-row items-center gap-1">
            {market ? getMarketName(market) : undefined}{' '}
            <MdOutlineKeyboardArrowDown size="1.5rem" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="text-text-default absolute mt-10 ml-10 min-w-min gap-4 overflow-auto rounded-lg bg-white py-4 pl-2 pr-4 text-base font-medium shadow-dark focus:outline-none">
              {markets
                ?.filter(
                  (item) => getMarketName(item).toLowerCase() !== tokenSymbol
                )
                .map((item, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={item}
                    onClick={() =>
                      router.push(
                        `/trading/${getMarketName(item).toLowerCase()}`
                      )
                    }
                    className="flex gap-2 px-2 py-2 hover:cursor-pointer"
                  >
                    {tokenIcon(getMarketName(item), 20)}
                    {getMarketName(item)}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
        <div className="flex flex-row">
          {market
            ? formatNumber(parseFloat(formatEther(market.spotPrice)), {
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
