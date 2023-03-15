import { gql } from '@apollo/client'

const GET_ETH_USD_PRICE = gql`
  query GetEthUsdPrice {
    priceFeeds(orderBy: id, orderDirection: desc, first: 1) {
      id
      price
    }
  }
`

export default GET_ETH_USD_PRICE
