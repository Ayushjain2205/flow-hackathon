import puppeteer from "puppeteer"

export default async (req, res) => {
  const url = "https://flowscan.org/account/0xecfad18ba9582d4f"

  const address_selector =
    "#__next > main > div.bg-gray-50 > div.pt-20.sm\\:pt-24.md\\:pt-28.lg\\:pt-32.bg-white.overflow-auto > div.container.container-padding.w-full.m-auto.mb-6 > div.sm\\:inline-block > div.flex.flex-row.items-center.mb-6 > span"

  const transcations_selector =
    "#__next > main > div.bg-gray-50 > div.pt-20.sm\\:pt-24.md\\:pt-28.lg\\:pt-32.bg-white.overflow-auto > div:nth-child(2) > div > nav > div > div:nth-child(2) > div > div"

  const created_at_selector =
    "#__next > main > div.bg-gray-50 > div.pt-20.sm\\:pt-24.md\\:pt-28.lg\\:pt-32.bg-white.overflow-auto > div.container.container-padding.w-full.m-auto.mb-6 > div.sm\\:inline-block > div.flex.flex-col > div:nth-child(2) > a"

  const portfolio_value_selector =
    "#__next > main > div.bg-gray-50 > div.pt-20.sm\\:pt-24.md\\:pt-28.lg\\:pt-32.bg-white.overflow-auto > div:nth-child(2) > div > div > div > div > div > div > div.p-6.flex.justify-between > div > span > span:nth-child(1)"

  const transfer_count_selector =
    "#__next > main > div.bg-gray-50 > div.pt-20.sm\\:pt-24.md\\:pt-28.lg\\:pt-32.bg-white.overflow-auto > div:nth-child(2) > div > nav > div > div:nth-child(3) > div > div"

  const table_selector =
    "#__next > main > div.bg-gray-50 > div.pt-20.sm\\:pt-24.md\\:pt-28.lg\\:pt-32.bg-white.overflow-auto > div:nth-child(2) > div > div > div > div > div > div > div.overflow-x-auto.overflow-y-hidden.relative > div.table.w-full.h-full > div"

  try {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: "networkidle0" })

    let address_value = null
    let transcations_value = null
    let wallet_age = null
    let portfolio_value = null
    let transfer_count = null
    let table_data = []

    try {
      const address = await page.$(address_selector)
      address_value = await page.evaluate((address) => address.textContent, address)
    } catch (error) {
      console.log("Failed to scrape address:", error)
    }

    try {
      const transcations = await page.$(transcations_selector)
      transcations_value = await page.evaluate(
        (transcations) => transcations.textContent,
        transcations
      )
    } catch (error) {
      console.log("Failed to scrape transcation count:", error)
    }

    try {
      const createdAtElement = await page.$(created_at_selector)
      const createdAt = await page.evaluate((element) => element.textContent, createdAtElement)
      const createdAtDate = new Date(createdAt)
      const currentDate = new Date()
      const diffTime = Math.abs(currentDate - createdAtDate)
      wallet_age = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    } catch (error) {
      console.log("Failed to scrape wallet creation date:", error)
    }

    try {
      const portfolio = await page.$(portfolio_value_selector)
      portfolio_value = await page.evaluate((portfolio) => portfolio.textContent, portfolio)
    } catch (error) {
      console.log("Failed to scrape portfolio value:", error)
    }

    try {
      const transferCount = await page.$(transfer_count_selector)
      transfer_count = await page.evaluate(
        (transferCount) => transferCount.textContent,
        transferCount
      )
    } catch (error) {
      console.log("Failed to scrape transfer count:", error)
    }

    try {
      const rows = await page.$$(table_selector)

      for (let row of rows) {
        const cells = await row.$$("div")
        let rowData = {}
        for (let i = 0; i < cells.length; i++) {
          const cellText = await page.evaluate((cell) => cell.textContent, cells[i])
          if (i === 0) {
            rowData["Token"] = cellText
          } else if (i === 1) {
            rowData["Balance"] = cellText
          } else if (i === 2) {
            rowData["Price"] = cellText
          } else if (i === 3) {
            rowData["Value"] = cellText
          }
        }
        table_data.push(rowData)
      }
    } catch (error) {
      console.log("Failed to scrape table data:", error)
    }

    await browser.close()

    res.status(200).json({
      data: {
        address: address_value,
        transcation_count: transcations_value,
        wallet_age: wallet_age,
        portfolio_value: portfolio_value,
        transfer_count: transfer_count,
        table_data: table_data,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to navigate to the website" })
  }
}
