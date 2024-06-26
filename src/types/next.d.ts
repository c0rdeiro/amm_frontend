/* eslint-disable no-unused-vars */
import { NextPage } from 'next/types'
import React from 'react'

type SupportedMarketSymbols = 'ETHUSDT' | 'BTCUSDT'

type Market = {
  symbol: SupportedMarketSymbols
  label: string
}

type CandlesInterval = '15m' | '1h' | '4h' | '8h' | '1d'

type CustomPage = NextPage & {
  title: string
  fullPage: boolean
}

type MenuLinkType = {
  label: string
  link: string
  icon?: React.ReactNode
}

type TokenInfoType = {
  label: string | React.ReactNode
  value: number
  type: '$' | '%'
  colorMode?: 'default' | 'redgreen' | 'gray'
}

type TabType = {
  key: number
  label: string
  action: () => void
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  isDisabled?: boolean
  bgColor?: 'red' | 'green'
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

// type PositionType = IVXPositionType | GMXPosition

type Order = {
  id: number
  token: Token
  strategy: 'Long' | 'Short'
  n: number
  type: 'Market' | 'Limit'
  price: number
  priceAbove: boolean
  markPrice: number
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
