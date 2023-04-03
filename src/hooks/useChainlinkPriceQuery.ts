import { SupportedMarketSymbols } from '@/types/next'
import GET_CHAINLINK_BTC_PRICE from '@/utils/apollo/getChainlinkBtc.query'
import GET_CHAINLINK_ETH_PRICE from '@/utils/apollo/getChainlinkPrice.query'
import { useQuery } from '@apollo/client'

type ChainlinkMarketPrice = { id: number; price: bigint }

const useChainlinkPricesQuery = (marketToken: SupportedMarketSymbols) => {
  //TODO: IMPROVE THIS
  const { data: ethData } = useEthPriceQuery()
  const { data: btcData } = useBtcPriceQuery()

  switch (marketToken) {
    case 'ETHUSDT':
      return { data: ethData }
    case 'BTCUSDT':
      return { data: btcData }
    default:
      return { data: undefined }
  }
}

const useEthPriceQuery = () => {
  const { data, loading, error } = useQuery<{
    ethPrices: ChainlinkMarketPrice[]
  }>(GET_CHAINLINK_ETH_PRICE, {
    pollInterval: 5000,
  })

  return { data: data?.ethPrices[0], loading, error }
}

const useBtcPriceQuery = () => {
  const { data, loading, error } = useQuery<{
    btcPrices: ChainlinkMarketPrice[]
  }>(GET_CHAINLINK_BTC_PRICE, {
    pollInterval: 5000,
  })

  return { data: data?.btcPrices[0], loading, error }
}

export default useChainlinkPricesQuery
