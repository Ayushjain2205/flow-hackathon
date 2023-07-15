import { NextRequest, NextResponse } from "next/server"
import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_TOKEN || "",
})

const KEY = process.env.OPENAI_API_KEY
const base_uri = "https://api.openai.com/v1/chat/completions"

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${KEY}`,
}

const data = {
  model: "gpt-3.5-turbo",
}

export async function POST(req, res) {
  try {
    const { query } = await req.json()

    const requestData = {
      ...data,
      messages: [{ role: "user", content: query }],
      functions: [
        {
          name: "buyNFT",
          description: "buy NFT on flow Blockchain, like NBA Top Shot or flowns",
          parameters: {
            type: "object",
            properties: {
              collection: {
                type: "string",
                description: "name of the NFT collection",
              },
            },
            required: ["collection"],
          },
        },
      ],
      function_call: "auto",
    }

    const response = await fetch(base_uri, {
      method: "POST",
      headers,
      body: JSON.stringify(requestData),
    })

    const json = await response.json()
    let choice = json.choices[0]

    const { function_call } = choice.message
    console.log("function_call: ", function_call)
    if (function_call) {
      const args = JSON.parse(function_call.arguments)
      if (function_call.name === "createVideo") {
        const output = await replicate.run(
          "anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f",
          {
            input: {
              ...args,
            },
          }
        )
        return NextResponse.json({
          data: output,
          type: "video",
        })
      }
      if (function_call.name === "createMusic") {
        const output = await replicate.run(
          "joehoover/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
          {
            input: {
              model_version: "melody",
              ...args,
            },
          }
        )
        return NextResponse.json({
          data: output,
          type: "audio",
        })
      }
      if (function_call.name === "createImage") {
        const output = await replicate.run(
          "ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",
          {
            input: {
              ...args,
            },
          }
        )
        return NextResponse.json({
          data: output,
          type: "image",
        })
      }
    } else {
      console.log("choice: ", choice)
      return NextResponse.json({
        data: choice.message.content,
        type: "text",
      })
    }
  } catch (err) {
    console.log("error: ", err)
    return NextResponse.json({ error: err })
  }
}
