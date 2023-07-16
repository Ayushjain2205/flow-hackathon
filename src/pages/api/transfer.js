import { config, send, getAccount } from "@onflow/fcl"
import { Address, UFix64 } from "@onflow/types"

config().put("accessNode.api", "https://access-testnet.onflow.org") // for Flow Testnet

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fromAddress, toAddress, amount } = req.body

    try {
      const response = await send([
        fcl.transaction`
          import FungibleToken from 0x9a0766d93b6608b7
          import FlowToken from 0x7e60df042a9c0868

          transaction(amount: UFix64, to: Address) {
            let senderVault: @FungibleToken.Vault

            prepare(signer: AuthAccount) {
              self.senderVault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
                ?? panic("Could not borrow reference to the sender's Vault")
            }

            execute {
              let receiver = getAccount(to)
              let receiverVault = receiver.getCapability(/public/flowTokenReceiver)
                .borrow<&{FungibleToken.Receiver}>()
                ?? panic("Could not borrow receiver reference to the recipient's Vault")

              receiverVault.deposit(from: <-self.senderVault.withdraw(amount: amount))
            }
          }
        `,
        fcl.params([fcl.param(amount, UFix64, "amount"), fcl.param(toAddress, Address, "to")]),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.payer(fcl.authz),
        fcl.limit(1000),
      ])

      const transaction = await fcl.tx(response).onceSealed()
      res.status(200).json({ transaction })
    } catch (error) {
      res.status(500).json({ error: "Error transferring FLOW" })
    }
  } else {
    res.status(404).json({ error: "Invalid request method" })
  }
}
