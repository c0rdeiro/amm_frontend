import Slider from 'rc-slider'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind.config.cjs'

type LeverageSliderProps = {
  option: number | number[]
  setOption: (leverage: number | number[]) => void
  marks: MarkMap
  min: number
  max: number
  step: number
}

type MarkMap = {
  [key: number]: {
    label: string
    style: {
      color: string
    }
  }
}

const CustomSlider: React.FC<LeverageSliderProps> = ({
  option,
  setOption,
  marks,
  min,
  max,
  step,
}) => {
  const tw = resolveConfig(tailwindConfig)

  return (
    <Slider
      min={min}
      max={max}
      step={step}
      marks={marks}
      onChange={(value) => setOption(value)}
      defaultValue={option}
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
        width: '14px',
        height: '14px',
        bottom: '-5px',
        border: 'solid 3px',
        borderColor: tw.theme.colors.gray[400],
        backgroundColor: tw.theme.colors.gray[500],
      }}
    />
  )
}
export default CustomSlider
