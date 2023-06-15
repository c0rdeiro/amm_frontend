export default function isIVXPosition(
  position: IVXPositionType | GMXPosition
): position is IVXPositionType {
  return (position as IVXPositionType).breakeven !== undefined
}
