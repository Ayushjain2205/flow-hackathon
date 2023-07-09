const puppeteer = require("puppeteer")

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()

    await page.goto("https://www.flowverse.co/")

    const projects = await page.evaluate(() => {
      const projectDivs = Array.from(document.querySelectorAll(".item-card-excerpts-project-page"))

      return projectDivs.map((projectDiv) => {
        const imageElement = projectDiv.querySelector(".image-31")
        const nameElement = projectDiv.querySelector(".name-list-project-page")
        const descriptionElement = projectDiv.querySelector(".ellipsis")
        const urlElement = projectDiv.querySelector(".name-list-2.blue")

        const image = imageElement?.getAttribute("src") || ""
        const name = nameElement?.textContent?.trim() || ""
        const description = descriptionElement?.textContent?.trim() || ""
        const url = urlElement?.getAttribute("href") || ""

        return {
          image,
          name,
          description,
          url,
        }
      })
    })

    await browser.close()

    res.status(200).json(projects)
  } catch (error) {
    console.error("Error scraping projects:", error)
    res.status(500).json({ error: "An error occurred while scraping projects" })
  }
}
