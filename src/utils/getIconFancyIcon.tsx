import { Market } from '@/types/next'
import getTokenIcon from './getTokenIcon'
import clsx from 'clsx'

export default function getIconFancyIcon(market: Market) {
  return (
    <span
      className={clsx(
        'flex h-7 w-7 items-center justify-center rounded py-1 px-[2px]',
        {
          'bg-[#627eea33]': market.value === 'ETHUSDT',
          'bg-[rgba(247, 147, 26, 0.2)]': market.value === 'BTCUSDT',
        }
      )}
    >
      {getTokenIcon(market, 20)}
    </span>
  )
}
