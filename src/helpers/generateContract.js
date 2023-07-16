import axios from "axios"

export async function generateContract(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that translates English descriptions into Cadence smart contracts.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    )

    const contractCode = response.data.choices[0].message.content.trim()
    return contractCode
  } catch (error) {
    console.error("Error generating contract:", error)
  }
}
