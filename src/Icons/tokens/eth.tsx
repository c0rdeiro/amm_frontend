import { TokenIconProps } from '@/types/next'

const ETHIcon: React.FC<TokenIconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="80 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dddddd_139_9857)">
        <circle cx="92" cy="12" r="12" fill="#627EEA" />
      </g>
      <g clipPath="url(#clip0_139_9857)">
        <path
          d="M92.0088 14.4243L87.625 12.3389L92.0088 19.9999L96.3927 12.3389L92.0088 14.4243Z"
          fill="white"
        />
        <path
          d="M95.915 10.7849L92.0085 4L88.0977 10.7927L92.0085 8.9375L95.915 10.7849Z"
          fill="white"
        />
        <path
          d="M88.4365 11.6731L92.0084 13.365L95.5863 11.6703L92.0084 9.97852L88.4365 11.6731Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_dddddd_139_9857"
          x="0"
          y="0"
          width="184"
          height="204"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="100" />
          <feGaussianBlur stdDeviation="40" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.384314 0 0 0 0 1 0 0 0 0.07 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_139_9857"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="42" />
          <feGaussianBlur stdDeviation="16.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.384314 0 0 0 0 1 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_139_9857"
            result="effect2_dropShadow_139_9857"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="22" />
          <feGaussianBlur stdDeviation="9" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.384314 0 0 0 0 1 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_139_9857"
            result="effect3_dropShadow_139_9857"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="12" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.384314 0 0 0 0 1 0 0 0 0.035 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_dropShadow_139_9857"
            result="effect4_dropShadow_139_9857"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6.5" />
          <feGaussianBlur stdDeviation="2.75" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.384314 0 0 0 0 1 0 0 0 0.03 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_dropShadow_139_9857"
            result="effect5_dropShadow_139_9857"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.384314 0 0 0 0 1 0 0 0 0.02 0"
          />
          <feBlend
            mode="normal"
            in2="effect5_dropShadow_139_9857"
            result="effect6_dropShadow_139_9857"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect6_dropShadow_139_9857"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_139_9857">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(84 4)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ETHIcon
