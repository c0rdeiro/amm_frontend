/* eslint-disable no-unused-vars */
import { NextPage } from 'next/types'
import React from 'react'

type SupportedMarket = 'ETHUSDT' | 'BTCUSDT'

type CandlesIntervals = '15m' | '1h' | '4h'

type CustomPage = NextPage & {
  title: string
  fullPage: boolean
}

type MenuLinkType = {
  label: string
  link: string
  icon: React.ReactNode
}

type MarketTokenType = {
  symbol: string
  price: number
}

type TokenInfoType = {
  label: string | React.ReactNode
  value: number
  type: '$' | '%'
  colorMode?: 'default' | 'redgreen' | 'blue' | 'gray'
}

type TabType = {
  key: number
  label: string
  action: () => void
  icon?: React.ReactNode
}

type OptionType = {
  id: string
  strike: number
  breakEven: number
  toBreakEven: number
  impliedVolatility: number
  price: number
  isSell: boolean
  isCall: boolean
  expiryTime: number
}

type PositionType = {
  token: MarketTokenType
  operation: 'Call' | 'Put'
  numContracts: number
  strike: number
  expiryTime: number
  value: number
  size: number
  pnl: number
  costPerOption: number
  price: number
  profit: number
  status: 'Open' | 'Closed'
  impliedVolatility: number
  delta: number
  vega: number
  gamma: number
  theta: number
  openInterest: number
  openDate: Date
}

type TokenIconProps = {
  size: number
}

type KlineData = {
  e: 'kline' // Event type
  E: number // Event time
  s: string // Symbol
  k: {
    t: number // Kline start time
    T: number // Kline close time
    s: string // Symbol
    i: string // Interval
    f: number // First trade ID
    L: number // Last trade ID
    o: string // Open price
    c: string // Close price
    h: string // High price
    l: string // Low price
    v: string // Base asset volume
    n: number // Number of trades
    x: boolean // Is this kline closed?
    q: string // Quote asset volume
    V: string // Taker buy base asset volume
    Q: string // Taker buy quote asset volume
    B: string // Ignore
  }
}
