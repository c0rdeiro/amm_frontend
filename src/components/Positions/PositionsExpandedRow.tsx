import { PositionType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import { Row } from '@tanstack/react-table'
import { useState } from 'react'
import PositionCloseModal from '../Modals/PositionCloseModal'
import TableButton from '../shared/TableButton'
import PositionsExpandedRowItem from './PositionsExpandedRowItem'

type PositionsExpandedRowProps = {
  row: Row<PositionType>
  onClosePosition: () => void
  isConfirmingBtn?: boolean
}

const PositionsExpandedRow: React.FC<PositionsExpandedRowProps> = ({
  row,
  onClosePosition,
  isConfirmingBtn = false,
}) => {
  const items: { label: string; content: string }[] = [
    {
      label: 'Implied Volatility',
      content: formatNumber(row.original.impliedVolatility, {
        decimalCases: 2,
        symbol: '%',
        isSymbolEnd: true,
      }),
    },
    {
      label: 'Delta',
      content: formatNumber(row.original.delta, {
        decimalCases: 2,
      }),
    },
    {
      label: 'Vega',
      content: formatNumber(row.original.vega, {
        decimalCases: 2,
      }),
    },
    {
      label: 'Gamma',
      content: formatNumber(row.original.gamma, {
        decimalCases: 2,
      }),
    },
    {
      label: 'Theta',
      content: formatNumber(row.original.theta, {
        decimalCases: 2,
      }),
    },
    {
      label: 'Open Interest',
      content: formatNumber(row.original.openInterest, {
        decimalCases: 2,
        symbol: '$',
      }),
    },
  ]

  const [isDialogOpen, setisDialogOpen] = useState<boolean>(false)

  return (
    <>
      <div className="flex w-full items-center justify-between gap-2.5 py-2.5 pr-3 pl-6">
        {items.map((item, idx) => (
          <PositionsExpandedRowItem
            key={idx}
            label={item.label}
            content={item.content}
          />
        ))}
        <div className="flex items-end">
          {!isConfirmingBtn ? (
            <TableButton
              label="Close Position"
              styleType="outline"
              onClick={onClosePosition}
            />
          ) : (
            <TableButton
              label="Click again to close"
              styleType="normal"
              onClick={() => {
                setisDialogOpen(true)
              }}
            />
          )}
        </div>
      </div>
      <PositionCloseModal
        isOpen={isDialogOpen}
        setIsOpen={setisDialogOpen}
        position={row.original}
      />
    </>
  )
}

export default PositionsExpandedRow
