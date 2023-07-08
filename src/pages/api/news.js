import fetch from "node-fetch"

export default async (req, res) => {
  const query = "Flow Blockchain"
  const apiKey = "857f1ce6cd35dae1ce3da8a40e5ab7ac"
  const encodedQuery = encodeURIComponent(query)
  const apiUrl = `https://gnews.io/api/v4/search?q=${encodedQuery}&apikey=${apiKey}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    // Extracting the title and URL from each article
    const articles = data.articles.map((article) => {
      return {
        title: article.title,
        url: article.url,
      }
    })

    res.status(200).json(articles)
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "Failed to fetch news" })
  }
}
