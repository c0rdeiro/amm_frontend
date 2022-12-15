import TableButton from '@/components/shared/TableButton'
import { useState } from 'react'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import PositionsCompactTable from './PositionsCompactTable'

const TokenClosedPositionsPanel = () => {
  const [showClosedOptions, setshowClosedOptions] = useState<boolean>(false)

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1 pt-3 pb-1">
      <div className="pl-6">
        <TableButton
          label={'Closed Positions'}
          styleType="outline"
          onClick={() => setshowClosedOptions(!showClosedOptions)}
          rightIcon={
            showClosedOptions ? (
              <MdOutlineKeyboardArrowUp size="1.2rem" />
            ) : (
              <MdOutlineKeyboardArrowDown size="1.2rem" />
            )
          }
        />
      </div>
      {showClosedOptions && (
        <PositionsCompactTable statusToShow="Closed" showTableHeader={false} />
      )}
    </div>
  )
}
export default TokenClosedPositionsPanel
