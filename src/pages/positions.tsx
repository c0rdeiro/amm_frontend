import PositionsHeader, {
  FilterType,
} from '@/components/Positions/PositionsHeader'
import PositionsTable from '@/components/Positions/PositionsTable'
import { SelectItem } from '@/components/shared/Form/Select'
import { getTokens } from '@/lib/getTokens'
import { CustomPage } from '@/types/next'
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
    <div className="flex h-full w-full items-start overflow-y-auto px-20 pt-15">
      <div className="flex w-full flex-col items-start py-8 px-6">
        <h1 className="text-text-default px-6 pb-4 text-2.5xl font-semibold">
          Positions
        </h1>
        <PositionsHeader filters={filters} />
        <PositionsTable />
      </div>
    </div>
  )
}

PositionsPage.fullPage = true
PositionsPage.title = 'Positions'

export default PositionsPage
