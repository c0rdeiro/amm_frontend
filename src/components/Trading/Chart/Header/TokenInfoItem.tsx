import { TokenInfoType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import clsx from 'clsx'

type TokenInfoItemProps = {
  tokenInfo: TokenInfoType
}

const TokenInfoItem: React.FC<TokenInfoItemProps> = ({
  tokenInfo,
}: TokenInfoItemProps) => {
  return (
    <div className="ml-1 flex flex-col items-start gap-1 text-sm 2xl:ml-2 ">
      <div className="font-normal text-gray-300">{tokenInfo.label}</div>
      <div
        className={clsx('w-16 font-bold', {
          'text-green-400':
            tokenInfo.colorMode === 'redgreen' && tokenInfo.value > 0,
          'text-red-400':
            tokenInfo.colorMode === 'redgreen' && tokenInfo.value < 0,
          'text-gray-300': tokenInfo.colorMode === 'gray',
        })}
      >
        {formatNumber(tokenInfo.value, {
          decimalCases: 2,
          symbol: tokenInfo.type,
          isSymbolEnd: tokenInfo.type === '%',
          displayPositive: tokenInfo.type === '%',
        })}
      </div>
    </div>
  )
}

export default TokenInfoItem
