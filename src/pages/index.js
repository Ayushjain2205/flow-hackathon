import React, { useState, useRef, useEffect } from "react"
import Switch from "../components/Switch"
import Realtime from "../components/Realtime"

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
          <div className="flex flex-row gap-[24px]">
            <Realtime />
            <Switch />
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="flex flex-row items-center gap-[9px] m-[10px] cursor-pointer"
              >
                <div className="h-[56px] w-[56px] border border-black rounded-full flex flex-col items-center justify-center">
                  <img src="/avatar.svg" alt="" />
                </div>
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
      </div>
      <div className="flex flex-row gap-[64px]">
        <div className="flex flex-col gap-[32px]">
          {/* Collapse */}
          <div className="collapse bg-base-200 w-[310px] rounded-[18px]">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium h-[60px] bg-[#F8F8F8] text-[20px]">
              ⏱️ Our tasks
            </div>
            <div className="collapse-content bg-white max-h-[350px] overflow-scroll no-scrollbar">
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
              <div className="h-[84px] py-[20px]">
                <p className="text-[16px]">Recommend NFTs under 4FLOW</p>
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
              🥷 Know about AGENT
            </div>
            <div className="collapse-content bg-white max-h-[300px] overflow-scroll no-scrollbar">
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
          <div className="output"></div>
        </div>
      </div>
      <div className="flex flex-row gap-[16px] fixed bottom-[24px] right-[32px]">
        <div className="flex flex-col items-center justify-center h-[48px] w-[487px] rounded-[12px] bg-white text-[24px] text-[#262626] text-opacity-80 ">
          What are the latest projects on Flow?
        </div>
        <button className="h-[48px] w-[194px] rounded-[12px] bg-transparent border-[#0FA958] border-[2px] text-[24px] text-[#0FA958] ">
          Next prompt
        </button>

        <div
          className="flex flex-col items-center justify-center w-[48px] h-[48px] bg-[#262626] rounded-full cursor-pointer"
          onClick={handleToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M11 1V21"
              stroke="#D2FAE3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 11L11 21L1 11"
              stroke="#D2FAE3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default HomePage
