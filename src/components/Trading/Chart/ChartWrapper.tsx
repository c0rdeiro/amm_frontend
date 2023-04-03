import { useState, useCallback } from 'react'
import ChartContainer from './ChartContainer'

type ChartWrapperProps = {
  children: React.ReactNode
}
const ChartWrapper: React.FC<ChartWrapperProps> = ({ children }) => {
  const [container, setContainer] = useState()
  const handleRef = useCallback((ref: any) => setContainer(ref), []) //TODO check ref type

  return (
    <div ref={handleRef} className="h-full w-full overflow-auto">
      {container && (
        <ChartContainer container={container}>{children}</ChartContainer>
      )}
    </div>
  )
}
export default ChartWrapper
