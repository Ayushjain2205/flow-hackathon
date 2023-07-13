import { useEffect, useState } from "react"

const Realtime = ({ isDevMode }) => {
  const [data, setData] = useState([
    ["Volume(24h)", "64,267 FLOW"],
    ["Total Volume", "738,470,246 FLOW"],
    ["Total Transactions", "28,797,292"],
    ["FLOW/USD", "$0.59"],
  ])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/realtime")
      const jsonData = await response.json()
      setData(Object.entries(jsonData))
    }

    //fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [data])

  if (data.length === 0) {
    console.log(data)
    return null // Render nothing if data is not yet available
  }

  const labelTextColor = isDevMode ? "text-[#D2FAE3]" : "text-[#262626]"

  return (
    <div className="flex flex-row justify-center items-center transition-opacity duration-500 ease-in-out">
      <p className={`text-[16px] font-bold ${labelTextColor}`}>{data[currentIndex][0]}&nbsp;</p>
      <p className={`text-[16px] font-bold ${labelTextColor}`}>:</p>
      <p className="text-[16px] font-bold text-[#0FA958]">&nbsp; {data[currentIndex][1]}</p>
    </div>
  )
}

export default Realtime
