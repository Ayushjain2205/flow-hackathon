async function deployContract(code, address) {
  const response = await fetch("/api/deploy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      address,
    }),
  })

  if (!response.ok) {
    throw new Error("Error deploying contract")
  }

  const data = await response.json()
  return data.transaction
}
