import PositionsHeader, {
  FilterType,
} from '@/components/Positions/PositionsHeader'
import PositionsTable from '@/components/Positions/PositionsTable'
import RightPanel from '@/components/RightPanel/RightPanel'
import { SelectItem } from '@/components/shared/Form/Select'
import { getTokens } from '@/lib/getTokens'
import { CustomPage, PositionType } from '@/types/next'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const PositionsPage: CustomPage = () => {
  const { data: tokens } = useQuery({
    queryKey: ['tokens'],
    queryFn: getTokens,
    refetchInterval: 5000,
  })

  const allOperations: SelectItem[] = [
    { label: 'Call', value: 'Call', isDisabled: true },
    { label: 'Put', value: 'Put', isDisabled: true },
  ]
  const [operationFilter, setOperationFilter] =
    useState<SelectItem[]>(allOperations)

  const allTokens: SelectItem[] =
    tokens?.map((item) => ({
      label: item.symbol,
      value: item.symbol.toUpperCase(),
      isDisabled: true,
    })) ?? []
  const [tokensFilter, setTokensFilter] = useState<SelectItem[]>(allTokens)

  const allStatuses: SelectItem[] = [
    { label: 'Open', value: 'Open', isDisabled: true },
    { label: 'Closed', value: 'Closed', isDisabled: true },
  ]
  const [statusFilter, setStatusFilter] = useState<SelectItem[]>(allStatuses)
  const [currentPosition, setCurrentPosition] = useState<
    PositionType | undefined
  >()

  const filters: FilterType[] = [
    {
      options: allTokens,
      selectedItems: tokensFilter,
      setSelectedItems(arg: SelectItem[]) {
        setTokensFilter(arg)
      },
    },
    {
      options: allOperations,
      selectedItems: operationFilter,
      setSelectedItems(arg: SelectItem[]) {
        setOperationFilter(arg)
      },
    },
    {
      options: allStatuses,
      selectedItems: statusFilter,
      setSelectedItems(arg: SelectItem[]) {
        setStatusFilter(arg)
      },
    },
  ]

  return (
    <div className="flex h-full">
      <div className="w-full overflow-y-auto pt-14 pb-28 xl:px-2 2xl:shrink 2xl:px-20">
        <h1 className="text-text-default px-6 pb-4 text-2.5xl font-semibold">
          Positions
        </h1>
        <PositionsHeader filters={filters} />
        <PositionsTable setPositionToClose={setCurrentPosition} />
      </div>
      <RightPanel isOption={false} position={currentPosition} />
    </div>
  )
}

PositionsPage.fullPage = true
PositionsPage.title = 'Positions'

export default PositionsPage
