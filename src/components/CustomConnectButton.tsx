import { ConnectButton } from '@rainbow-me/rainbowkit'
import Button from './shared/Button'

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
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
                  />
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    size="sm"
                    label="Wrong network"
                  />
                )
              }

              return (
                <ConnectButton />
                // <div style={{ display: 'flex', gap: 12 }}>
                //   <button
                //     onClick={openChainModal}
                //     style={{ display: 'flex', alignItems: 'center' }}
                //     type="button"
                //   >
                //     {chain.hasIcon && (
                //       <div
                //         style={{
                //           background: chain.iconBackground,
                //           width: 12,
                //           height: 12,
                //           borderRadius: 999,
                //           overflow: 'hidden',
                //           marginRight: 4,
                //         }}
                //       >
                //         {chain.iconUrl && (
                //           <img
                //             alt={chain.name ?? 'Chain icon'}
                //             src={chain.iconUrl}
                //             style={{ width: 12, height: 12 }}
                //           />
                //         )}
                //       </div>
                //     )}
                //     {chain.name}
                //   </button>

                //   <button onClick={openAccountModal} type="button">
                //     {account.displayName}
                //     {account.displayBalance
                //       ? ` (${account.displayBalance})`
                //       : ''}
                //   </button>
                // </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default CustomConnectButton
