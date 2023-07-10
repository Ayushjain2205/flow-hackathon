const puppeteer = require("puppeteer")

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto(
      "https://nft.flowverse.co/marketplace/FlowverseTreasures?isMulti=true&currency=FLOW&maxPrice=10",
      { waitUntil: "networkidle2" }
    )

    await page.waitForSelector(".w-full.h-auto > div:nth-child(2) > div")

    const parentElement = await page.$(".w-full.h-auto > div:nth-child(2)")
    console.log(parentElement)
    const childDivs = await page.$$eval(".w-full.h-auto > div:nth-child(2) > div", (divs) => {
      return divs.map((div) => {
        // const image = div.querySelector("img.aspect-square").getAttribute("src")
        const name = div.querySelector("h5").textContent
        //const price = div.querySelector(".flex.font-bold.text-xs.sm:text-sm").textContent
        return {
          // image,
          name,
          //price
        }
      })
    })

    await browser.close()

    res.status(200).json({ divs: childDivs })
  } catch (error) {
    console.error("Error scraping element:", error)
    res.status(500).json({ error: "An error occurred while scraping element" })
  }
}
