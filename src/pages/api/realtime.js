import puppeteer from "puppeteer"

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()

    await page.goto("https://nft.flowverse.co/marketplace", { waitUntil: "networkidle2" })

    await page.waitForXPath('//*[@id="__next"]/div[1]')
    const [elementHandle] = await page.$x('//*[@id="__next"]/div[1]')
    const volume24h = await elementHandle.$eval(
      "p.text-xs.text-gray-300:nth-child(1) span:nth-child(2)",
      (el) => el.textContent
    )
    const totalVolume = await elementHandle.$eval(
      "p.text-xs.hidden.lg\\:block.text-gray-300:nth-child(2) span:nth-child(2)",
      (el) => el.textContent
    )
    const totalTransactions = await elementHandle.$eval(
      "p.text-xs.hidden.lg\\:block.text-gray-300:nth-child(3) span:nth-child(2)",
      (el) => el.textContent
    )
    const flowUSD = await elementHandle.$eval(
      "p.text-xs.hidden.sm\\:block.text-gray-300:nth-child(4) span:nth-child(2)",
      (el) => el.textContent
    )

    await browser.close()

    res.status(200).json({
      volume24h,
      totalVolume,
      totalTransactions,
      flowUSD,
    })
  } catch (error) {
    console.error("Error scraping element:", error)
    res.status(500).json({ error: "An error occurred while scraping element" })
  }
}
