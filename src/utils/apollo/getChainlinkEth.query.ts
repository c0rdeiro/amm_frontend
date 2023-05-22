import { gql } from '@apollo/client'

const GET_CHAINLINK_ETH_PRICE = gql`
  query GetChainlinkEthPrice {
    ethPrices(orderBy: id, orderDirection: desc, first: 1) {
      id
      price
    }
  }
`

export default GET_CHAINLINK_ETH_PRICE
