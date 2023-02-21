import { TbFileText } from 'react-icons/tb'
import Button from '../shared/Button'
import Select, { SelectItem } from '../shared/Form/Select'

export type FilterType = {
  selectedItems: SelectItem<string>[]
  setSelectedItems: (arg: SelectItem<string>[]) => void
  options: SelectItem<string>[]
}

type PositionsHeaderProps = {
  filters?: FilterType[]
}

const PositionsHeader: React.FC<PositionsHeaderProps> = ({ filters }) => {
  return (
    <div className="flex w-full items-start justify-between gap-4 px-6 pb-12">
      <div className="flex items-start gap-4">
        {filters?.map((filter, idx) => (
          <Select
            key={idx}
            items={filter.options}
            selectedItem={filter.selectedItems}
            setSelectedItem={filter.setSelectedItems}
          />
        ))}
      </div>
      <Button
        label="Export CSV"
        size="sm"
        rightIcon={<TbFileText />}
        styleType="outline"
      />
    </div>
  )
}

export default PositionsHeader
