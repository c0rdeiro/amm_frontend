import { Market } from './types/next'

export const markets: Market[] = [
  {
    symbol: 'ETHUSDT',
    label: 'ETH / USDT',
  },
  {
    symbol: 'BTCUSDT',
    label: 'BTC / USDT',
  },
]

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const GMX_ROUTER_ADDRESS = '0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064'

type SUPPORTED_NETWORKS = 'ARBITRUM'

export type Token = {
  //TODO: refactor to lose value (when refactoring Select)
  value: string
  symbol: string
  label: string
  insideLabel: string
  network: SUPPORTED_NETWORKS
  decimals: number
  address: `0x${string}`
  isNative?: boolean
  isStable?: boolean
}

export const TOKENS: Token[] = [
  {
    insideLabel: 'Ethereum',
    value: 'ETH',
    label: 'ETH',
    symbol: 'ETH',
    network: 'ARBITRUM',
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    decimals: 18,
    isNative: true,
  },
  {
    insideLabel: 'Bitcoin',
    value: 'BTC',
    label: 'BTC',
    symbol: 'BTC',
    network: 'ARBITRUM',
    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    decimals: 8,
  },
  {
    insideLabel: 'Tether Coin',
    label: 'USDT',
    value: 'USDT',
    symbol: 'USDT',
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    network: 'ARBITRUM',
    decimals: 6,
    isStable: true,
  },
  {
    insideLabel: 'USD Coin',
    label: 'USDC',
    value: 'USDC',
    symbol: 'USDC',
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    network: 'ARBITRUM',
    decimals: 6,
    isStable: true,
  },
]
