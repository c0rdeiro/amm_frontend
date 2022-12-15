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
          'bg-primary': enabled,
          'bg-select/[.5]': !enabled,
          'h-4 w-6.5': size === 'sm',
          'h-5 w-8.5': size === 'md',
          'h-7 w-12.5': size === 'lg',
        },
        'relative inline-flex items-center rounded-full'
      )}
    >
      <span
        className={clsx(
          {
            'translate-x-1': !enabled,
            'h-2 w-2': size === 'sm',
            'h-4 w-4': size === 'md',
            'h-6 w-6': size === 'lg',
            'translate-x-4': ['md', 'sm'].includes(size) && enabled,
            'translate-x-6': size === 'lg' && enabled,
          },
          'inline-block transform rounded-full bg-white transition'
        )}
      />
    </UISwitch>
  )
}

export default Switch
