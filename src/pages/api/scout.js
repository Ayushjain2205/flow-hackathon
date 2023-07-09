const puppeteer = require("puppeteer")
const { NextApiRequest, NextApiResponse } = require("next")

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto(
      "https://nft.flowverse.co/marketplace/FlowverseTreasures?isMulti=true&currency=FLOW&maxPrice=10"
    )

    const items = await page.evaluate(() => {
      const parentDiv = document.querySelector(
        "#__next > div.h-full.relative.bg-black > div > div.mx-auto.px-[16px].lg:px-[32px].2xl:px-[64px].bg-black.py-0.pb-5.sm:py-8 > div.p-0.pt-16.sm:pt-10.text-gray-100 > div.py-3 > div.flex.flex-col.md:flex-row.md:space-x-4 > div.w-full.h-auto > div.p-4.pl-0.pr-0.grid.grid-cols-1.xs:grid-cols-2.lg:grid-cols-3.xl:grid-cols-4.2xl:grid-cols-5.4xl:grid-cols-6.gap-6"
      )
      const itemDivs = Array.from(parentDiv.children)

      console.log(itemDivs) // Display itemDivs in the terminal

      return itemDivs.map((itemDiv) => {
        const nameElement = itemDiv.querySelector("h5")
        const linkElement = itemDiv.querySelector(".name-list-2.blue")

        const name = nameElement?.textContent?.trim() || ""
        const link = linkElement?.getAttribute("href") || ""

        return {
          name,
          link,
        }
      })
    })

    await browser.close()

    res.status(200).json(items)
  } catch (error) {
    console.error("Error scraping items:", error)
    res.status(500).json({ error: "An error occurred while scraping items" })
  }
}
