const puppeteer = require("puppeteer")

export default async function handler(req, res) {
  try {
    // Launch a new instance of Puppeteer
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()

    // Navigate to the airdrop calendar page
    await page.goto("https://www.flowverse.co/drops#All")

    // Wait for the necessary content to load
    await page.waitForSelector(".content-wrapper")

    // Scroll to load more items
    await autoScroll(page)

    // Extract the airdrop calendar data
    const airdropCalendar = await page.evaluate(() => {
      const dropItems = Array.from(document.querySelectorAll(".w-dyn-item"))

      return dropItems.map((dropItem) => {
        const nameElement = dropItem.querySelector(".title")
        const dateElement = dropItem.querySelector(".status-pill.upcoming > div:first-child")
        const urlElement = dropItem.querySelector("a.clickable")
        const priceElement = dropItem.querySelector(".price")

        const name = nameElement?.textContent?.trim() || ""
        const date = dateElement?.textContent?.trim() || ""
        const url = "https://www.flowverse.co" + urlElement?.getAttribute("href") || ""
        const price = priceElement?.textContent?.trim() || ""

        return { name, date, url, price }
      })
    })

    // Close the Puppeteer browser instance
    await browser.close()

    // Return the airdrop calendar data as the API response
    res.status(200).json(airdropCalendar)
  } catch (error) {
    console.error("Error scraping airdrop calendar:", error)
    res.status(500).json({ error: "An error occurred while scraping the airdrop calendar" })
  }
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
