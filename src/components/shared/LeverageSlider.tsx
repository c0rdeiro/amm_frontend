import Slider from 'rc-slider'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind.config.cjs'

type LeverageSliderProps = {
  leverageOption: number | number[]
  setLeverageOption: (leverage: number | number[]) => void
}

const leverageMarks = {
  1.1: { label: '1.1x', style: { color: '#A3a3b1' } },
  5: { label: '5x', style: { color: '#A3a3b1' } },
  10: { label: '10x', style: { color: '#A3a3b1' } },
  15: { label: '15x', style: { color: '#A3a3b1' } },
  20: { label: '20x', style: { color: '#A3a3b1' } },
  25: { label: '25x', style: { color: '#A3a3b1' } },
}

const LeverageSlider: React.FC<LeverageSliderProps> = ({
  leverageOption,
  setLeverageOption,
}) => {
  const tw = resolveConfig(tailwindConfig)

  return (
    <Slider
      min={1.1}
      max={25}
      step={0.1}
      marks={leverageMarks}
      onChange={(value) => setLeverageOption(value)}
      defaultValue={leverageOption}
      trackStyle={{
        background: tw.theme.colors.primary,
      }}
      handleStyle={{
        background: tw.theme.colors.primary,
        border: 'solid 3px',
        borderColor: tw.theme.colors.primary,
      }}
      railStyle={{
        background: tw.theme.colors.gray[400],
      }}
      dotStyle={{
        border: 'solid 3px',
        borderColor: tw.theme.colors.gray[400],
        backgroundColor: tw.theme.colors.gray[500],
      }}
    />
  )
}
export default LeverageSlider
