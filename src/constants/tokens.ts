type SUPPORTED_NETWORKS = 'ARBITRUM'

// export type ERC20_TOKENS_SUPPORTED = 'USDT' | 'USDC'

// export type ERC20_TOKEN = {
//   insideLabel: string
//   network: SUPPORTED_NETWORKS
//   address: `0x${string}`
//   value: ERC20_TOKENS_SUPPORTED
//   label: string
//   decimals: number
//   isERC20: boolean
// }

export type Token = {
  value: string
  label: string
  insideLabel: string
  network: SUPPORTED_NETWORKS
  decimals: number
  isERC20: boolean
  address: `0x${string}`
}

export const TOKENS: Token[] = [
  {
    insideLabel: 'Tether Coin',
    label: 'USDT',
    value: 'USDT',
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    network: 'ARBITRUM',
    decimals: 6,
    isERC20: true,
  },
  {
    insideLabel: 'USD Coin',
    label: 'USDC',
    value: 'USDC',
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    network: 'ARBITRUM',
    decimals: 6,
    isERC20: true,
  },
  {
    insideLabel: 'Ethereum',
    value: 'ETH',
    label: 'ETH',
    network: 'ARBITRUM',
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    decimals: 18,
    isERC20: false,
  },
  {
    insideLabel: 'Bitcoin',
    value: 'BTC',
    label: 'BTC',
    network: 'ARBITRUM',
    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    decimals: 8,
    isERC20: false,
  },
]
