import { useEffect, useState } from "react"

const Realtime = () => {
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/realtime")
      const jsonData = await response.json()
      setData(Object.entries(jsonData))
    }

    fetchData()
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
    return null // Render nothing if data is not yet available
  }

  return (
    <div className="flex flex-row justify-center items-center transition-opacity duration-500 ease-in-out">
      <p className="text-[14px] font-bold text-[#262626]">{data[currentIndex][0]}&nbsp;</p>
      <p className="text-[14px] font-bold text-[#262626]">:</p>
      <p className="text-[14px] font-bold text-[#0FA958]">&nbsp; {data[currentIndex][1]}</p>
    </div>
  )
}

export default Realtime
