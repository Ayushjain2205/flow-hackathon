export default async function handler(req, res) {
  try {
    const { query } = req.query

    // Log the request data
    console.log("Request data:", req.body)

    // Commenting out OpenAI API calls for now
    // Replace this section with your OpenAI API code

    // const API_KEY = process.env.CHATGPT_API_KEY;
    // const API_URL = 'https://api.openai.com/v1/chat/completions';
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-3.5-turbo',
    //     messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: query }],
    //   }),
    // };
    // const response = await fetch(API_URL, requestOptions);
    // const data = await response.json();
    // const generatedMessage = data.choices[0].message.content;

    // res.status(200).json({ message: generatedMessage });

    res.status(200).json({ message: "Request data logged successfully." })
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "An error occurred" })
  }
}
