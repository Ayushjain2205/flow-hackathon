import axios from "axios"

export async function debugContract(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that debugs Cadence smart contracts. The user has a Cadence smart contract that is not behaving as expected.",
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

    const debugResponse = response.data.choices[0].message.content.trim()
    return debugResponse
  } catch (error) {
    console.error("Error debugging contract:", error)
  }
}
