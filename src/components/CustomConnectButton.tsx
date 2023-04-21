import { ConnectButton } from '@rainbow-me/rainbowkit'
import Button from './shared/Button'
import { IoWalletOutline } from 'react-icons/io5'
import { RxExit } from 'react-icons/rx'
import Image from 'next/image'

const CustomConnectButton = () => {
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
                  <Button
                    onClick={openConnectModal}
                    label={'Connect Wallet'}
                    size="sm"
                    rightIcon={<IoWalletOutline />}
                    styleType="monochromatic"
                  />
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    size="sm"
                    label="Wrong network"
                    styleType="red"
                  />
                )
              }

              return (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={openChainModal}
                    label={''}
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
