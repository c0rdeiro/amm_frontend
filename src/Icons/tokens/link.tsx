import { TokenIconProps } from '@/types/next'

const LINKIcon: React.FC<TokenIconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="9 11 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="21" cy="23" r="12" />
      <path
        d="M21 11L18.8836 12.2661L13.1164 15.7339L11 17V29L13.1164 30.2661L18.9365 33.7339L21.0529 35L23.1693 33.7339L28.8836 30.2661L31 29V17L28.8836 15.7339L23.1164 12.2661L21 11ZM15.2328 26.4679V19.5321L21 16.0642L26.7672 19.5321V26.4679L21 29.9358L15.2328 26.4679Z"
        fill="#2A5ADA"
      />
    </svg>
  )
}

export default LINKIcon
