const puppeteer = require("puppeteer")
const { NextApiRequest, NextApiResponse } = require("next")

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()

    await page.goto("https://nft.flowverse.co/stats")

    await page.waitForSelector(".hidden.lg\\:table.table-fixed")

    const stats = await page.evaluate(() => {
      const table = document.querySelector(".table-fixed")
      const rows = Array.from(table.querySelectorAll("tbody tr"))

      return rows.map((row) => {
        const columns = Array.from(row.querySelectorAll("td"))

        const rank = columns[0]?.textContent?.trim() || ""
        const collection = columns[1]?.textContent?.trim() || ""
        const volume = columns[2]?.textContent?.trim() || ""
        const growth = columns[3]?.textContent?.trim() || ""
        const averagePrice = columns[4]?.textContent?.trim() || ""
        const sales = columns[5]?.textContent?.trim() || ""
        const uniqueBuyers = columns[6]?.textContent?.trim() || ""

        return {
          rank,
          collection,
          volume,
          growth,
          averagePrice,
          sales,
          uniqueBuyers,
        }
      })
    })

    await browser.close()

    res.status(200).json(stats)
  } catch (error) {
    console.error("Error scraping stats:", error)
    res.status(500).json({ error: "An error occurred while scraping stats" })
  }
}
