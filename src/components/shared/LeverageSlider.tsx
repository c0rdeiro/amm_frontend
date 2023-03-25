import { ThemeContext } from '@/providers/ThemeProvider'
import Slider from 'rc-slider'
import { useContext } from 'react'

type LeverageSliderProps = {
  leverageOption: number | number[]
  setLeverageOption: (leverage: number | number[]) => void
}

const leverageMarks = {
  2: { label: '2x' },
  5: { label: '5x' },
  10: { label: '10x' },
  15: { label: '15x' },
  20: { label: '20x' },
  25: { label: '25x' },
  30: { label: '30x' },
  35: { label: '35x' },
  40: { label: '40x' },
  45: { label: '45x' },
  50: { label: '50x' },
}

const LeverageSlider: React.FC<LeverageSliderProps> = ({
  leverageOption,
  setLeverageOption,
}) => {
  const { isDarkTheme } = useContext(ThemeContext)

  return (
    <Slider
      min={1.1}
      max={50}
      step={0.1}
      marks={leverageMarks}
      onChange={(value) => setLeverageOption(value)}
      defaultValue={leverageOption}
      trackStyle={{
        background: '#2e979a',
      }}
      handleStyle={{
        background: isDarkTheme ? '#2E2E3A' : '#AEAEBE',
        border: 'solid 2px #2e979a',
      }}
      railStyle={{
        background: isDarkTheme ? '#2E2E3A' : '#AEAEBE',
      }}
      dotStyle={{
        border: 'none',
        width: '2px',
        backgroundColor: '#2e979a', //isDarkTheme ? '#2E2E3A' : '#AEAEBE',
      }}
    />
  )
}
export default LeverageSlider
