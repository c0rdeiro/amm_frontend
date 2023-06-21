import 'rc-slider/assets/index.css'

import { TOKENS } from '@/constants'
import { TabType } from '@/types/next'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useState } from 'react'
import { HiArrowsRightLeft } from 'react-icons/hi2'
import { IoTrendingDownSharp, IoTrendingUpSharp } from 'react-icons/io5'

import TokenSwap from '../../shared/Swap/TokenSwap'
import Tabs from '../../shared/Tabs'
import GMXLongShort from './GMXLongPut'

const GMXTrader = () => {
  const [strategy, setStrategy] = useState<'long' | 'short' | 'swap'>('long')
  const [exchangeType, setExchangeType] = useState<'market' | 'limit'>('market')
  const strategyTabs: TabType[] = [
    {
      key: 0,
      label: 'Long',

      leftIcon: <IoTrendingUpSharp size="1.125rem" />,
      action: () => {
        setStrategy('long')
      },
    },
    {
      key: 1,
      label: 'Short',
      leftIcon: <IoTrendingDownSharp size="1.125rem" />,
      action: () => {
        setStrategy('short')
      },
    },
    {
      key: 2,
      label: 'Swap',
      leftIcon: <HiArrowsRightLeft size="1.125rem" />,
      action: () => {
        setStrategy('swap')
      },
    },
  ]

  const tabsExchangeType: TabType[] = [
    {
      key: 0,
      label: 'Market',
      action: () => setExchangeType('market'),
    },
    {
      key: 1,
      label: 'Limit',
      action: () => setExchangeType('limit'),
    },
  ]

  return (
    <LayoutGroup>
      <AnimatePresence>
        <motion.div
          layout="position"
          className="flex w-full flex-col gap-3 rounded-l-lg rounded-br-lg border border-t-0 border-gray-500 bg-gray-600 p-5 text-white"
        >
          <div className="flex flex-col gap-2">
            <Tabs tabList={strategyTabs} style="normal" />
            <div className="flex w-min">
              <Tabs tabList={tabsExchangeType} style="no-style" size="sm" />
            </div>
          </div>

          {strategy === 'swap' ? (
            <TokenSwap tokens={TOKENS} exchangeType={exchangeType} />
          ) : (
            <GMXLongShort
              tokens={TOKENS}
              exchangeType={exchangeType}
              strategy={strategy}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  )
}

export default GMXTrader
