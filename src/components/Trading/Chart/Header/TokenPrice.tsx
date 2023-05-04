import Spinner from '@/components/shared/Spinner'
import { useTokenPrice } from '@/store/tokenStore'
import formatNumber from '@/utils/formatNumber'
import { useEffect, useState } from 'react'

const WS_UPDATE_SPEED = 500 //ms

const TokenPrice = () => {
  const tokenPrice = useTokenPrice()
  const [displayPrice, setDisplayPrice] = useState(tokenPrice)

  useEffect(() => {
    if (!displayPrice || !tokenPrice) {
      setDisplayPrice(tokenPrice)
    }
    if (displayPrice !== undefined && tokenPrice !== undefined) {
      animateValue(displayPrice, tokenPrice, WS_UPDATE_SPEED, setDisplayPrice)
    }
  }, [tokenPrice])

  return (
    <div className="flex flex-row text-2xl font-bold">
      {displayPrice ? (
        formatNumber(displayPrice, {
          decimalCases: 2,
          symbol: '$',
        })
      ) : (
        <Spinner />
      )}
    </div>
  )
}

//Quadratic easing
function quadratic(duration: number, range: number, current: number) {
  return (((duration * 3) / Math.pow(range, 3)) * Math.pow(current, 2)) / 1e15
}

export function animateValue(
  start: number,
  end: number,
  duration: number,
  setter: (tokenPrice: number) => void
) {
  const range = Math.abs(Number((end - start).toFixed(2)))
  let current = Number(start.toFixed(2))
  const increment = end > start ? 0.01 : -0.01

  const step = function () {
    current += increment
    setter(Number(current.toFixed(2)))
    if (Math.abs(current - end) > 0.01) {
      setTimeout(step, quadratic(duration, range, current))
    } else {
      return
    }
  }

  setTimeout(step, quadratic(duration, range, start))
}
export default TokenPrice
