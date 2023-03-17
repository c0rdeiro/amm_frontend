import Tabs from '@/components/shared/Tabs'
import { TabType } from '@/types/next'
import PositionsCompactTable from './PositionsCompactTable'
import TokenClosedPositionsPanel from './TokenClosedPositionsPanel'

const TokenPositionsPanel = () => {
  const tableTabs: TabType[] = [
    {
      label: 'Open',
      action: () => {},
    },
    {
      label: 'Closed',
      action: () => {},
    },
  ]

  return (
    <div className="flex w-full items-start gap-8 overflow-y-auto pb-14">
      <div className="flex w-full flex-col items-start rounded-lg  py-8 px-6 ">
        <div className="flex items-center px-6 pb-4 ">
          <Tabs tabList={tableTabs} size="md" style="monochromatic" />
        </div>
        <PositionsCompactTable statusToShow="Open" />
        {/* <TokenClosedPositionsPanel /> */}
      </div>
    </div>
  )
}

export default TokenPositionsPanel
