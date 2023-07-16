import { config, send, getAccount } from "@onflow/fcl"
import { Address, String } from "@onflow/types"

config().put("accessNode.api", "https://access-testnet.onflow.org") // for Flow Testnet

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code, address } = req.body

    try {
      const account = await getAccount(address)
      const response = await send([
        fcl.transaction`
          transaction {
            prepare(signer: AuthAccount) {
              let code = "${(p) => p.code}".decodeHex()
              signer.contracts.add(name: "${(p) => p.name}", code: code)
            }
          }
        `,
        fcl.params([
          fcl.param(Buffer.from(code, "utf8").toString("hex"), String, "code"),
          fcl.param(address, Address, "address"),
        ]),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.payer(fcl.authz),
        fcl.limit(1000),
      ])

      const transaction = await fcl.tx(response).onceSealed()
      res.status(200).json({ transaction })
    } catch (error) {
      res.status(500).json({ error: "Error deploying contract" })
    }
  } else {
    res.status(404).json({ error: "Invalid request method" })
  }
}
