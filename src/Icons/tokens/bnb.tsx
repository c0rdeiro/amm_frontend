import { TokenIconProps } from '@/types/next'

const BNBIcon: React.FC<TokenIconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#202020" />
      <path
        d="M9.66949 11.0425L12 8.71199L14.3316 11.0435L15.6876 9.68749L12 6L8.31359 9.68639L9.66954 11.0424L9.66949 11.0425ZM6 12L7.35604 10.6437L8.71199 11.9997L7.35595 13.3557L6 12ZM9.66949 12.9576L12 15.288L14.3315 12.9565L15.6882 14.3118L15.6876 14.3125L12 18L8.31359 14.3136L8.31167 14.3116L9.66963 12.9575L9.66949 12.9576ZM15.288 12.0006L16.644 10.6445L18 12.0005L16.644 13.3565L15.288 12.0006Z"
        fill="#F3BA2F"
      />
      <path
        d="M13.3753 11.9993H13.3758L12 10.6233L10.983 11.64L10.8662 11.7569L10.6252 11.9979L10.6233 11.9997L10.6252 12.0017L12 13.3767L13.3759 12.0007L13.3766 11.9999L13.3754 11.9993"
        fill="#F3BA2F"
      />
    </svg>
  )
}

export default BNBIcon
