import PositionsHeader, {
  FilterType,
} from '@/components/Positions/PositionsHeader'
import PositionsTable from '@/components/Positions/PositionsTable'
import RightPanel from '@/components/RightPanel/RightPanel'
import { SelectItem } from '@/components/shared/Form/Select'
import { getTokens } from '@/lib/getTokens'
import { CustomPage, PositionType } from '@/types/next'
import { useQuery } from '@tanstack/react-query'
import { fetchBalance } from '@wagmi/core'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const token = await getToken({ req: context.req })

  const address = token?.sub ?? null

  return {
    props: {
      address,
      session,
    },
  }
}

type AuthenticatedPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

const PositionsPage: CustomPage = ({ ...props }: AuthenticatedPageProps) => {
  // access address with props.address

  const { data: currentBalance } = useQuery({
    queryKey: ['currentBalance'], //TODO this will change on current address
    queryFn: () =>
      fetchBalance({
        address: '0x8164a9014b87a3f696423a825c6f20b05e2d740c',
        token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', //id of USDC TODO: this will come from coinSelected
      }),
    // enabled: !!props.address,
  })

  useEffect(() => {
    console.log(currentBalance)
  }, [currentBalance])

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
