import fetch from "node-fetch"

export default async (req, res) => {
  const { address } = req.query
  const accountDetailsUrl = `http://localhost:3000/api/scrape?address=${address}`
  const walletDetailsUrl = `http://localhost:3000/api/account-details?address=${address}`

  try {
    // Fetch Account Details
    const accountDetailsResponse = await fetch(accountDetailsUrl)
    const accountDetailsData = await accountDetailsResponse.json()

    // Fetch Wallet Details
    const walletDetailsResponse = await fetch(walletDetailsUrl)
    const walletDetailsData = await walletDetailsResponse.json()

    // Extract Data from Account Details
    const {
      transaction_count: transactionCount,
      wallet_age: walletAge,
      portfolio_value: portfolioValue,
      transfer_count: transferCount,
      table_data: tableData,
    } = accountDetailsData.data

    // Extract Data from Wallet Details
    const { hotColdScore, topCurrencies, hasExposure } = walletDetailsData

    // Calculate Weighted Hot/Cold Score
    const weightedHotColdScore = hotColdScore * 0.6

    // Calculate Weighted Portfolio Value
    const numericPortfolioValue = parseFloat(portfolioValue.replace(/[^0-9.-]+/g, ""))
    const weightedPortfolioValue = numericPortfolioValue * 0.4

    // Calculate Overall Health Score
    const weightedScore = weightedHotColdScore + weightedPortfolioValue
    const maxWeightedScore = 300 // Maximum possible value for the weighted score
    const overallHealthScore = ((weightedScore / maxWeightedScore) * 100).toFixed()

    // Prepare Response Object
    const response = {
      overallHealthScore,
      hotColdScore,
      portfolioValue,
      topNFTs: tableData,
      topCurrencies,
      transferCount,
      transactionCount,
      exposure: hasExposure,
    }

    res.status(200).json(response)
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "Failed to fetch wallet health details" })
  }
}
