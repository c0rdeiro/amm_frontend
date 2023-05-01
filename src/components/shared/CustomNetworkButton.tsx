import { ConnectButton } from '@rainbow-me/rainbowkit'
import Button from './Button'
import { IoWalletOutline } from 'react-icons/io5'
import { RxExit } from 'react-icons/rx'
import Image from 'next/image'

type CustomConnectButtonProps = {
  showNetwork?: boolean
  showAddress?: boolean
  networkDisplay?: 'full' | 'icon'
  networkBtnSize?: 'sm' | 'lg'
}

const CustomNetworkButton: React.FC<CustomConnectButtonProps> = ({
  showNetwork = true,
  showAddress = true,
  networkDisplay = 'icon',
  networkBtnSize = 'sm',
}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        openAccountModal,

        mounted,
      }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <div
            className="w-full"
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    label={'Connect Wallet'}
                    size={networkBtnSize}
                    rightIcon={<IoWalletOutline />}
                    styleType="monochromatic"
                  />
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    size={networkBtnSize}
                    label="Wrong network"
                    styleType="red"
                  />
                )
              }

              return (
                <div className="flex w-full items-center gap-2">
                  {showNetwork && (
                    <Button
                      size={networkBtnSize}
                      onClick={openChainModal}
                      label={
                        networkDisplay === 'full' && chain.name
                          ? chain.name
                          : ''
                      }
                      rightIcon={
                        chain.iconUrl ? (
                          <Image
                            src={chain.iconUrl}
                            alt={'chain logo'}
                            width={22}
                            height={25}
                          />
                        ) : undefined
                      }
                      styleType="monochromatic"
                    />
                  )}

                  {showAddress && (
                    <Button
                      size="sm"
                      onClick={openAccountModal}
                      label={`${account.address.slice(
                        0,
                        5
                      )}...${account.address.slice(
                        account.address.length - 4
                      )}`}
                      styleType="monochromatic"
                      rightIcon={<RxExit />}
                    />
                  )}
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default CustomNetworkButton
