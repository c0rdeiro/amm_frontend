import { ConnectButton } from '@rainbow-me/rainbowkit'
import { IoWalletOutline } from 'react-icons/io5'
import { RxExit } from 'react-icons/rx'
import Image from 'next/image'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Button from './Button'

type CustomConnectButtonProps = {
  style?: 'monochromatic' | 'normal'
  size?: 'sm' | 'lg'
}

const CustomConnectButton: React.FC<CustomConnectButtonProps> = ({
  style = 'monochromatic',
  size = 'sm',
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
                  <>
                    <span className="hidden md:flex">
                      <Button
                        onClick={openConnectModal}
                        label={'Connect Wallet'}
                        size={size}
                        rightIcon={<IoWalletOutline />}
                        styleType={style}
                        labelColor={
                          style === 'monochromatic' ? 'white' : 'dark'
                        }
                      />
                    </span>

                    <span className="flex md:hidden">
                      <Button
                        onClick={openConnectModal}
                        label={'Connect Wallet'}
                        size={size}
                        styleType={style}
                        labelColor={
                          style === 'monochromatic' ? 'white' : 'dark'
                        }
                      />
                    </span>
                  </>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    size={size}
                    label="Wrong network"
                    styleType="red"
                  />
                )
              }

              return (
                <div className="flex items-center gap-2">
                  <span className="hidden md:flex">
                    <Button
                      size="sm"
                      onClick={openChainModal}
                      label={''}
                      rightIcon={
                        chain.iconUrl ? (
                          <span className="flex w-full gap-2 text-gray-300">
                            <Image
                              src={chain.iconUrl}
                              alt={'chain logo'}
                              width={24}
                              height={24}
                            />
                            <MdOutlineKeyboardArrowDown size={24} />
                          </span>
                        ) : undefined
                      }
                      styleType="monochromatic"
                    />
                  </span>

                  <Button
                    size="sm"
                    onClick={openAccountModal}
                    label={`${account.address.slice(
                      0,
                      5
                    )}...${account.address.slice(account.address.length - 4)}`}
                    styleType="monochromatic"
                    rightIcon={<RxExit />}
                  />
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default CustomConnectButton
