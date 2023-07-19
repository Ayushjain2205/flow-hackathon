import { NextRequest, NextResponse } from "next/server"

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
        {
          name: "sendMoney",
          description: "Send money on flow Blockchain, to another wallet address",
          parameters: {
            type: "object",
            properties: {
              address: {
                type: "string",
                description: "wallet address of the receiver",
              },
              required: ["address"],
            },
          },
        },
        {
          name: "drop",
          description: "upcoming Airdrops on Flow blockchain",
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
        {
          name: "Reminder",
          description: "Set Reminders about things to do",
          parameters: {
            type: "object",
            properties: {
              reminder: {
                type: "string",
                description: "Task to remind about",
              },
            },
            required: ["reminder"],
          },
        },
        {
          name: "Task",
          description: "Perform task or activities like searching for NFTs",
          parameters: {
            type: "object",
            properties: {
              task: {
                type: "string",
                description: "task title",
              },
            },
            required: ["task"],
          },
        },
        {
          name: "walletHealth",
          description: "Check wallet health of a wallet address",
          parameters: {
            type: "object",
            properties: {
              address: {
                type: "string",
                description: "wallet address of the receiver",
              },
              required: ["address"],
            },
          },
        },
        {
          name: "news",
          description: "Get news related to Flow Blockchain",
          parameters: {
            type: "object",
            properties: {
              headline: {
                type: "string",
                description: "headline of the news",
              },
              required: ["headline"],
            },
          },
        },
        {
          name: "smartContract",
          description: "Get smart contract details to generate",
          parameters: {
            type: "object",
            properties: {
              description: {
                type: "string",
                description: "description of smart contract",
              },
              required: ["description"],
            },
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
      }
      if (function_call.name === "createMusic") {
      }
      if (function_call.name === "createImage") {
      }
    } else {
      console.log("choice: ", choice)
    }
  } catch (err) {
    console.log("error: ", err)
    return NextResponse.json({ error: err })
  }
}
