import tokenIcon from '@/hooks/tokenIcon'
import { useRouter } from 'next/router'
import PositionsCompactTable from './PositionsCompactTable'
import TokenClosedPositionsPanel from './TokenClosedPositionsPanel'

const TokenPositionsPanel = () => {
  const router = useRouter()
  const tokenSymbol = router.asPath.split('/').pop() ?? ''
  return (
    <div className="flex w-full items-start gap-8 pt-6 pb-14">
      <div className="flex w-full flex-col items-start rounded-lg bg-gray-400 py-8 px-6">
        <div className="flex items-center gap-4 px-6 pb-4 text-lg font-semibold">
          {tokenIcon(tokenSymbol, 36)} {tokenSymbol.toUpperCase()} Open
          Positions
        </div>
        <PositionsCompactTable statusToShow="Open" />
        <TokenClosedPositionsPanel />
      </div>
    </div>
  )
}

export default TokenPositionsPanel
