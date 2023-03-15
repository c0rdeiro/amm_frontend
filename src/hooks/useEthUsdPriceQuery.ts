import GET_ETH_USD_PRICE from '@/utils/apollo/getEthUsdPrice.query'
import { useQuery } from '@apollo/client'

const useEthUsdPriceQuery = () => {
  const {
    data: raw_data,
    loading,
    error,
  } = useQuery<{ priceFeeds: { id: number; price: bigint }[] }>(
    GET_ETH_USD_PRICE,
    { pollInterval: 1000 }
  )

  const data = raw_data?.priceFeeds[0]
  return { data, loading, error }
}

export default useEthUsdPriceQuery
