import React, { useState, useRef, useEffect } from "react"

const HomePage = () => {
  const [inputValue, setInputValue] = useState("")
  const [enteredValues, setEnteredValues] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)

  const inputRef = useRef(null)
  const messagesRef = useRef(null)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    // call scrollToBottom() in 200ms to wait for the collapse animation to finish
    setTimeout(() => {
      scrollToBottom()
    }, 200)
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key, shiftKey, altKey, ctrlKey, metaKey } = event
      const capsLockActive = event.getModifierState("CapsLock")
      const modifierKeysPressed = shiftKey || altKey || ctrlKey || metaKey || capsLockActive

      if (!inputRef.current || modifierKeysPressed || key === "Escape" || key === "Tab") {
        return
      }

      event.preventDefault()

      if (key === "Enter") {
        const newValue = inputRef.current.value.trim()
        if (newValue !== "") {
          setEnteredValues((prevValues) => [...prevValues, newValue])
          setInputValue("")
        }
        setInputValue("")
      } else if (key === "Backspace") {
        setInputValue((prevValue) => prevValue.slice(0, -1))
      } else {
        setInputValue((prevValue) => prevValue + key)
      }

      inputRef.current.focus()
    }

    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [enteredValues])

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }

  return (
    <div className="min-h-screen px-[32px] py-[24px]">
      <div className="navbar mb-[42px] p-0">
        <div className="flex-1">
          <a className="font-bold text-[36px] text-[#0FA958]">FLOW-Agent</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="flex flex-row items-center gap-[9px] m-[10px] cursor-pointer"
            >
              <div className="h-[56px] w-[56px] border border-black rounded-full"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-[18px] w-52"
            >
              <li>
                <a>My Wallet</a>
              </li>
              <li>
                <a>History</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-[64px]">
        <div className="flex flex-col gap-[32px]">
          {/* Collapse */}
          <div className="collapse bg-base-200 w-[310px] rounded-[18px]">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium h-[60px] bg-[#F8F8F8] text-[20px]">
              Task/ Reminders
            </div>
            <div className="collapse-content bg-white">
              <div className="h-[84px] py-[20px]">
                <p className="text-[16px]">Send FLOW to Kristin</p>
                <p className="text-[14px] text-[#959595]">9th July, 11:00 AM</p>
              </div>
              <div className="h-[84px] py-[20px]">
                <p className="text-[16px]">AIRDROP NFTS</p>
                <p className="text-[14px] text-[#959595]">Everyday, 11:00 AM</p>
              </div>
              <div className="h-[84px] py-[20px]">
                <p className="text-[16px]">Recommend NFTs under 4FLOW</p>
                <p className="text-[14px] text-[#959595]">Everyday, 11:00 AM</p>
              </div>
            </div>
          </div>

          <div className="collapse bg-base-200 w-[310px] rounded-[18px]">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium h-[60px] bg-[#F8F8F8] text-[20px]">
              News
            </div>
            <div className="collapse-content bg-white">
              <div className="h-[84px] py-[20px]">
                <p className="text-[16px]">Send FLOW to Kristin</p>
                <p className="text-[14px] text-[#959595]">9th July, 11:00 AM</p>
              </div>
              <div className="h-[84px] py-[20px]">
                <p className="text-[16px]">AIRDROP NFTS</p>
                <p className="text-[14px] text-[#959595]">Everyday, 11:00 AM</p>
              </div>
            </div>
          </div>

          <div className="collapse bg-base-200 w-[310px] rounded-[18px]">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium h-[60px] bg-[#F8F8F8] text-[20px]">
              Know about AGENT
            </div>
            <div className="collapse-content bg-white">
              <div className="h-[60px] py-[20px]">
                <p className="text-[16px]">Know wallet health</p>
              </div>
              <div className="h-[60px] py-[20px]">
                <p className="text-[16px]">BUY A NFT</p>
              </div>
              <div className="h-[60px] py-[20px]">
                <p className="text-[16px]">Send FLOW</p>
              </div>
              <div className="h-[60px] py-[20px]">
                <p className="text-[16px]">Set budget for scouting</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[24px]">
          <p className="text-[32px] font-bold">What may I do for you?</p>
          <div
            className={`messages transition-all ${
              isExpanded ? "h-[400px]" : "h-[36px]"
            } overflow-auto no-scrollbar`}
            ref={messagesRef}
          >
            <div className="entered-values transition-opacity ">
              {enteredValues.map((value, index) => (
                <div key={index} className="entered-value">
                  {value}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type here..."
              className="border-0 text-[#262626] text-opacity-50 outline-none bg-transparent text-2xl font-bold"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              ref={inputRef}
            />
          </div>
        </div>
      </div>
      <div
        className="w-[87px] h-[87px] bg-[#262626] rounded-full fixed bottom-[27px] right-[42px] cursor-pointer"
        onClick={handleToggle}
      ></div>
    </div>
  )
}

export default HomePage
