/* eslint-disable no-unused-vars */
import { NextPage } from 'next/types'
import React from 'react'

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
