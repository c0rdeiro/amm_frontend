import Lyra, { Chain, Version } from '@lyrafinance/lyra-js'

const lyra = new Lyra(Chain.Arbitrum)
lyra.version = Version.Newport

export default lyra
