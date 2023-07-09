import puppeteer from "puppeteer"
import { NextApiRequest, NextApiResponse } from "next"
import topStats from "../../helpers/top"

export default async function handler(req, res) {
  try {
    //const stats = await scrapeStats();
    res.status(200).json(topStats)
  } catch (error) {
    console.error("Error scraping stats:", error)
    res.status(500).json({ error: "An error occurred while scraping stats" })
  }
}

async function scrapeStats() {
  const browser = await puppeteer.launch({ headless: "new" })
  const page = await browser.newPage()

  await page.goto("https://nft.flowverse.co/stats")

  // Wait for the necessary content to load
  await page.waitForSelector(".table-fixed")

  // Scroll to load more items
  await autoScroll(page)

  const stats = await page.evaluate(() => {
    const tables = Array.from(document.querySelectorAll("table"))
    const allStats = []

    tables.forEach((table) => {
      const rows = Array.from(table.querySelectorAll("tr"))

      rows.forEach((row) => {
        const columns = Array.from(row.querySelectorAll("td"))
        const rank = columns[0]?.textContent?.trim() || ""
        const image = columns[1]?.querySelector("img")?.getAttribute("src") || ""
        const collection = columns[1]?.textContent?.trim() || ""
        const volume = columns[2]?.textContent?.trim() || ""
        const growth = columns[3]?.textContent?.trim() || ""
        const averagePrice = columns[4]?.textContent?.trim() || ""
        const sales = columns[5]?.textContent?.trim() || ""
        const uniqueBuyers = columns[6]?.textContent?.trim() || ""

        allStats.push({
          rank,
          image,
          collection,
          volume,
          growth,
          averagePrice,
          sales,
          uniqueBuyers,
        })
      })
    })

    return allStats.slice(1, 11)
  })

  await browser.close()

  return stats
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0
      const distance = 100
      const timer = setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance

        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  })
}
