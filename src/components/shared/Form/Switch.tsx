import { Switch as UISwitch } from '@headlessui/react'
import clsx from 'clsx'

type SwitchProps = {
  enabled: boolean
  setEnabled?: (flag: boolean) => void
  size?: 'md' | 'sm' | 'lg'
  isDisabled?: boolean
}

const Switch: React.FC<SwitchProps> = ({
  enabled,
  setEnabled,
  size = 'md',
  isDisabled = false,
}: SwitchProps) => {
  return (
    <UISwitch
      checked={enabled}
      onChange={setEnabled ?? undefined}
      disabled={isDisabled}
      className={clsx(
        {
          'bg-blue': enabled,
          'bg-gray-300': !enabled,
          'h-4 w-6': size === 'sm',
          'h-5 w-8': size === 'md',
          'h-7 w-12': size === 'lg',
        },
        'relative inline-flex items-center rounded-full'
      )}
    >
      <span
        className={clsx(
          {
            'translate-x-[2px]': !enabled,
            'h-3 w-3': size === 'sm',
            'h-4 w-4': size === 'md',
            'h-6 w-6': size === 'lg',
            'translate-x-[10px]': ['md', 'sm'].includes(size) && enabled,
            'translate-x-6': size === 'lg' && enabled,
          },
          'inline-block transform rounded-full bg-white transition'
        )}
      />
    </UISwitch>
  )
}

export default Switch
