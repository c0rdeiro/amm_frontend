import { gql } from '@apollo/client'

const GET_CHAINLINK_BTC_PRICE = gql`
  query GetChainlinkBtcPrice {
    btcPrices(orderBy: id, orderDirection: desc, first: 1) {
      id
      price
    }
  }
`

export default GET_CHAINLINK_BTC_PRICE
