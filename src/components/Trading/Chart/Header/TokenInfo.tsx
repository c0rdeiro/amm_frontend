import { useTokenChartHoverInfo, useTokenInfo } from '@/store/tokenStore'
import TokenInfoItem from './TokenInfoItem'

const TokenInfo: React.FC = () => {
  const items = useTokenInfo()
  const chartHoverInfo = useTokenChartHoverInfo()

  return (
    <div className="flex flex-row items-start gap-6">
      {chartHoverInfo
        ? chartHoverInfo.map((item, index) => (
            <TokenInfoItem key={index} tokenInfo={item} />
          ))
        : items.map((item, index) => (
            <TokenInfoItem key={index} tokenInfo={item} />
          ))}
    </div>
  )
}

export default TokenInfo
