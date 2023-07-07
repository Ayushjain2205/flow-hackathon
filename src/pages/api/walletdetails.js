// pages/api/walletdetails.js

import { config, send, decode, getTransactions } from "@onflow/fcl"

config()
  .put("accessNode.api", "https://mainnet.onflow.org") // for Mainnet
  .put("decoder", decode)

export default async (req, res) => {
  const { flowAddress } = req.query

  if (!flowAddress) {
    return res.status(400).json({ error: "flowAddress is required" })
  }

  try {
    const response = await send([
      getTransactions().forAddress(flowAddress).last(50), // get the last 50 transactions
    ])

    const transactions = await decode(response)

    res.status(200).json({ transactions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Unable to fetch transaction details" })
  }
}
