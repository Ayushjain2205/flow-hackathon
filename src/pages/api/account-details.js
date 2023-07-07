import fetch from "node-fetch"

export default async (req, res) => {
  const { address } = req.query
  const maliciousAddresses = ["0x123456789abc", "0x987654321def"] // Predefined malicious addresses

  const myHeaders = new fetch.Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("X-API-KEY", "BQYha6dlfMMNXGyYBmpsfWXY4oagljWM")

  const raw = JSON.stringify({
    query: `
      query MyQuery($address: String!) {
        flow {
          address(address: { is: $address }) {
            address
            balance
          }
          transactions(any: { payer: { in: [$address] } }) {
            count
            payer {
              address
            }
            proposer {
              address
            }
            collectionId
            date {
              date
            }
          }
          outputs {
            amount
            currency {
              address
              symbol
            }
          }
        }
      }
    `,
    variables: { address: address[0] }, // Access the first element of the address array
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  try {
    const response = await fetch("https://graphql.bitquery.io", requestOptions)

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage || "Failed to fetch account details")
    }

    const result = await response.json()

    // Validate response structure
    if (!result || !result.data || !result.data.flow || !result.data.flow.address) {
      throw new Error("Invalid response format")
    }

    // Calculate Hot/Cold Score
    const transactions = result.data.flow.transactions
    const hasTransactions = transactions.count > 0
    const currentDate = new Date()
    let hotColdScore = 86

    if (hasTransactions) {
      const latestTransactionDate = new Date(transactions[0].date.date)
      const timeDifference = currentDate.getTime() - latestTransactionDate.getTime()
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24))
      const weightedScore = Math.min(10, daysDifference) * 2 // Weighted score for recent activity

      if (transactions.count > 1) {
        hotColdScore = weightedScore + Math.ceil(transactions.count / 10) // Additional weight for number of transactions
      } else {
        hotColdScore = weightedScore + 1 // Minimum score for single transaction
      }
    }

    // Calculate Top 5 Currencies
    const outputs = result.data.flow.outputs
    const topCurrencies = outputs
      .filter(
        (output) =>
          output.amount > 0 &&
          output.currency.symbol &&
          !["_", "-"].includes(output.currency.symbol)
      )
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map((output) => ({ symbol: output.currency.symbol }))

    // Check Exposure to Malicious Addresses
    const hasExposure = transactions.some((transaction) => {
      return (
        maliciousAddresses.includes(transaction.payer.address) ||
        maliciousAddresses.includes(transaction.proposer.address)
      )
    })

    res.status(200).json({
      hotColdScore,
      topCurrencies,
      hasExposure,
    })
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: error.message || "Failed to fetch account details" })
  }
}
