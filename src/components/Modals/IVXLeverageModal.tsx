import { IoCloseOutline } from 'react-icons/io5'
import Modal from '../shared/Modal'
import CustomSlider from '../shared/CustomSlider'
import { useState } from 'react'
import { MdInfo, MdKeyboardArrowRight } from 'react-icons/md'
import Button from '../shared/Button'

type IVXLeverageModalProps = {
  isOpen: boolean
  setIsOpen: (flag: boolean) => void
  leverage: number | number[]
  setLeverage: (leverage: number | number[]) => void
}

const leverageMarks = {
  1: { label: '1x', style: { color: '#A3a3b1' } },
  2: { label: '2x', style: { color: '#A3a3b1' } },
  3: { label: '3x', style: { color: '#A3a3b1' } },
  4: { label: '4x', style: { color: '#A3a3b1' } },
  5: { label: '5x', style: { color: '#A3a3b1' } },
}

const IVXLeverageModal: React.FC<IVXLeverageModalProps> = ({
  isOpen,
  setIsOpen,
  leverage,
  setLeverage,
}) => {
  const [auxLeverage, setAuxLeverage] = useState(leverage)

  const confirm = () => {
    setLeverage(auxLeverage)
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex w-96 flex-col items-start gap-7 rounded bg-gray-500 p-5">
        <div className="flex w-full items-center justify-between text-gray-300">
          <h2 className="text-lg font-normal text-white">Adjust Leverage</h2>
          <IoCloseOutline size={24} onClick={() => setIsOpen(false)} />
        </div>
        <div className="mb-4 flex w-full flex-col items-start gap-3">
          <h5 className="text-xs font-normal text-gray-300">Leverage</h5>
          <CustomSlider
            marks={leverageMarks}
            max={5}
            min={1}
            step={null}
            option={auxLeverage}
            setOption={setAuxLeverage}
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <ul className="list-inside list-disc text-start text-xs font-normal text-white">
            <li>Maximum position at current leverage: 200,000,000 USD</li>
            <li>
              Please note that leverage changing will also apply for open
              positions and open orders.
            </li>
          </ul>
          <div className="flex items-start gap-1 text-start text-xs font-normal text-red-400">
            <div>
              <MdInfo size={16.5} />
            </div>
            <p>
              Selecting higher leverage such as [10×] increases your liquidation
              risk. Always manage your risk levels. See our help article for
              more information.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-normal text-primary">
            <p>Check on Leverage & Margin table</p>
            <MdKeyboardArrowRight size={18} />
          </div>
          <div className="flex items-center gap-1 text-xs font-normal text-primary">
            <p>Position Limit Enlarge</p>
            <MdKeyboardArrowRight size={18} />
          </div>
        </div>
        <Button label="Confirm" onClick={confirm} size="lg" />
      </div>
    </Modal>
  )
}
export default IVXLeverageModal
