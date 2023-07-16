async function transferFlow(fromAddress, toAddress, amount) {
  const response = await fetch("/api/transfer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromAddress,
      toAddress,
      amount,
    }),
  })

  if (!response.ok) {
    throw new Error("Error transferring FLOW")
  }

  const data = await response.json()
  return data.transaction
}
