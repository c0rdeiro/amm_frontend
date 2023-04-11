import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils.js'

type FormatNumberOptions = {
  decimalCases?: number
  symbol?: '' | '$' | '%'
  isSymbolEnd?: boolean //default false -> if true show symbol in the end of the number
  displayPositive?: boolean //default false -> if true
}

const handleNumberSymbol = (
  value: number | BigNumber,
  displayPositive: boolean
): string => {
  if (value instanceof BigNumber) value = parseFloat(formatEther(value))

  if (value < 0) {
    return '-'
  }
  if (value > 0 && displayPositive) {
    return '+'
  }

  return ''
}

export default function formatNumber(
  value: number,
  options?: FormatNumberOptions
) {
  // const f = new Intl.NumberFormat('en-US')

  const {
    decimalCases = 0,
    symbol = '',
    isSymbolEnd = false,
    displayPositive = false,
  } = options || {}

  if (symbol === '%') value = value * 100

  const parts = Math.abs(value).toString().split('.')
  const num = parts[0]!.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // add commas

  const decimal = (parts[1] ?? '').padEnd(decimalCases, '0')

  const outNum =
    decimal !== '' ? `${num}.${decimal.substring(0, decimalCases)}` : num

  return `${handleNumberSymbol(value, displayPositive)}${
    isSymbolEnd ? `${outNum}${symbol}` : ` ${symbol}${outNum}`
  }`
}
