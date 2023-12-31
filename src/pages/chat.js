import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Switch from "../components/Switch"
import Realtime from "../components/Realtime"
import Template from "../components/Template"
import Loader from "../components/Loader"

const HomePage = () => {
  const router = useRouter()

  const [inputValue, setInputValue] = useState("")
  const [enteredValues, setEnteredValues] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)

  const [taskPanel, setTaskPanel] = useState(true)
  const [agentPanel, setAgentPanel] = useState(true)

  const [outputContent, setOutputContent] = useState("")
  const [isInputDisabled, setIsInputDisabled] = useState(false)

  const [keypressActive, setKeypressActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [isDevMode, setIsDevMode] = useState(false)
  const chakraProps = {
    css: {
      colorMode: "normal",
    },
  }

  const { walletAddress } = router.query

  const handleToggleSwitch = (isChecked) => {
    setIsDevMode(isChecked)
  }

  const toggleTaskPanel = () => {
    setTaskPanel(!taskPanel)
  }
  const toggleAgentPanel = () => {
    setAgentPanel(!agentPanel)
  }

  const inputRef = useRef(null)
  const messagesRef = useRef(null)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    setTimeout(() => {
      scrollToBottom()
    }, 200)
  }

  const setOutput = (template) => {
    const newContent = <Template template={template} />
    setOutputContent(newContent)
    setKeypressActive(false)
  }

  const clearOutput = () => {
    setOutputContent("")
    setInputValue("")
    setIsInputDisabled(false)
  }

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (keypressActive) {
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
            try {
              setIsLoading(true)
              setIsInputDisabled(true)
              const response = await fetch("/api/functions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: newValue }),
              })
              if (response.ok) {
                const data = await response.json()
                console.log("API Response:", data)
                setOutput(data.message)
                setEnteredValues((prevValues) => [
                  ...prevValues,
                  { type: "user", message: newValue },
                  { type: "system", message: "The Agent Replied" },
                ])
                setIsLoading(false)
              } else {
                console.error("Error:", response.status)
                // Handle the error
              }
            } catch (error) {
              console.error("Error:", error)
              // Handle the error
            }
          }
        } else if (key === "Backspace") {
          setInputValue((prevValue) => prevValue.slice(0, -1))
        } else {
          setInputValue((prevValue) => prevValue + key)
        }
        // inputRef.current.focus()
      } else {
        return
      }
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
    <div
      className="min-h-screen px-[32px] py-[24px] bg-backround"
      data-theme={isDevMode ? "devMode" : "normalMode"}
      {...chakraProps}
    >
      <div className="navbar mb-[42px] p-0 ">
        <div className="flex-1">
          <a className="font-bold text-[36px] text-[#0FA958]">FLOW.ai</a>
        </div>
        <div className="flex-none">
          <div className="flex flex-row gap-[24px]">
            <Realtime isDevMode={isDevMode} />
            <Switch onToggle={handleToggleSwitch} />
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="flex flex-row items-center gap-[9px] m-[10px] cursor-pointer"
              >
                <div className="h-[56px] w-[56px] border border-primary rounded-full flex flex-col items-center justify-center">
                  <img src={isDevMode ? "/avatar_dev.svg" : "/avatar.svg"} alt="" />
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-[#f5f5f5] rounded-[18px] w-[250px] "
              >
                <li>
                  <a
                    href={`https://testnet.flowscan.org/account/${walletAddress}`}
                    target="_blank"
                    rel="noreferrer"
                    className=" hover:text-black text-[#007BFF] text-[20px] p-[16px]"
                  >
                    {walletAddress}
                  </a>
                </li>
                <li>
                  <a className="text-black hover:text-black text-[20px] p-[16px]">Add Wallet</a>
                </li>
                <li>
                  <a className="text-black hover:text-black text-[20px] p-[16px]">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-[64px]">
        {!isDevMode ? (
          <div className="flex flex-col gap-[32px]">
            {/* Collapse */}
            <div className="collapse bg-white w-[310px] rounded-[18px] shadow-NFT">
              <input type="checkbox" onChange={toggleTaskPanel} checked={taskPanel} />
              <div className="collapse-title flex flex-row w-[310px] gap-[10px] justify-between text-xl font-medium h-[60px] bg-[#F8F8F8] text-[20px] pr-[16px] text-[#262626]">
                <div> ⏱️ Our tasks</div>
                <div>
                  {taskPanel ? <img src="/minus.svg" alt="" /> : <img src="/plus.svg" alt="" />}
                </div>
              </div>
              <div className="collapse-content bg-white max-h-[350px] overflow-scroll no-scrollbar hover:cursor-pointer">
                <div className="h-[84px] py-[20px]">
                  <p className="text-[16px] text-black">Send FLOW to Kristin</p>
                  <p className="text-[14px] text-[#959595]">19th July, 11:00 AM</p>
                </div>
                <div className="h-[84px] py-[20px]">
                  <p className="text-[16px] text-black">AIRDROP NFTS</p>
                  <p className="text-[14px] text-[#959595]">Everyday, 11:00 AM</p>
                </div>
                <div className="h-[84px] py-[20px]">
                  <p className="text-[16px] text-black">Recommend NFTs under 4FLOW</p>
                  <p className="text-[14px] text-[#959595]">Everyday, 1:00 PM</p>
                </div>
                <div className="h-[84px] py-[20px]">
                  <p className="text-[16px] text-black">Show new TopShot mints</p>
                  <p className="text-[14px] text-[#959595]">Everyday, 12:00 AM</p>
                </div>
              </div>
            </div>

            <div className="collapse bg-white w-[310px] rounded-[18px] shadow-NFT">
              <input type="checkbox" onChange={toggleAgentPanel} checked={agentPanel} />
              <div className="collapse-title flex flex-row w-[310px] gap-[10px] justify-between text-xl font-medium h-[60px] bg-[#F8F8F8] text-[20px] pr-[16px] text-[#262626]">
                <div> 🥷 Know about AGENT</div>
                <div>
                  {agentPanel ? <img src="/minus.svg" alt="" /> : <img src="/plus.svg" alt="" />}
                </div>
              </div>
              <div className="collapse-content bg-white max-h-[300px] overflow-scroll no-scrollbar hover:cursor-pointer">
                <div
                  className="h-[60px] py-[20px]"
                  onClick={() => {
                    setInputValue("Tell me about my wallet health")
                  }}
                >
                  <p className="text-[16px] text-black">Know wallet health</p>
                </div>
                <div
                  className="h-[60px] py-[20px]"
                  onClick={() => {
                    setInputValue("I want to buy a NBA TopShot NFT")
                  }}
                >
                  <p className="text-[16px] text-black">BUY A NFT</p>
                </div>
                <div
                  className="h-[60px] py-[20px]"
                  onClick={() => {
                    setInputValue("I want to send money")
                  }}
                >
                  <p className="text-[16px] text-black">Send FLOW</p>
                </div>
                <div
                  className="h-[60px] py-[20px]"
                  onClick={() => {
                    setInputValue("Look for NFTs under 4 FLOW")
                  }}
                >
                  <p className="text-[16px] text-black">Set budget for scouting</p>
                </div>
                <div className="h-[60px] py-[20px]">
                  <p className="text-[16px] text-black">Send FLOW</p>
                </div>
                <div className="h-[60px] py-[20px]">
                  <p className="text-[16px] text-black">Set budget for scouting</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[32px]">
            {/* Collapse */}
            <div className="collapse bg-white w-[310px] rounded-[18px] shadow-NFT">
              <input type="checkbox" onChange={toggleTaskPanel} checked={taskPanel} />
              <div className="collapse-title flex flex-row w-[310px] gap-[10px] justify-between text-xl font-medium h-[60px] bg-[#F8F8F8] text-[20px] pr-[16px] text-[#262626]">
                <div> 💻 Community updates</div>
                <div>
                  {taskPanel ? <img src="/minus.svg" alt="" /> : <img src="/plus.svg" alt="" />}
                </div>
              </div>
              <div className="collapse-content bg-white max-h-[300px] overflow-scroll no-scrollbar hover:cursor-pointer">
                <div className="h-[60px] py-[20px]">
                  <p className="text-[16px] text-black">Hybrid Custody Community Review</p>
                </div>
                <div className="h-[60px] py-[20px]">
                  <p className="text-[16px] text-black">Verification node v0.31.11 upgrade</p>
                </div>
                <div className="h-[60px] py-[20px]">
                  <p className="text-[16px] text-black">Consensus node v0.31.10 upgrade</p>
                </div>
              </div>
            </div>

            <div className="collapse bg-white w-[310px] rounded-[18px] shadow-NFT">
              <input type="checkbox" onChange={toggleAgentPanel} checked={agentPanel} />
              <div className="collapse-title flex flex-row w-[310px] gap-[10px] justify-between text-xl font-medium h-[60px] bg-[#F8F8F8] text-[20px] pr-[16px] text-[#262626]">
                <div> 🥷 Know about AGENT</div>
                <div>
                  {agentPanel ? <img src="/minus.svg" alt="" /> : <img src="/plus.svg" alt="" />}
                </div>
              </div>
              <div className="collapse-content bg-white max-h-[300px] overflow-scroll no-scrollbar hover:cursor-pointer">
                <div
                  className="h-[60px] py-[20px]"
                  onClick={() => {
                    setInputValue("How do I write a function in Cadence?")
                  }}
                >
                  <p className="text-[16px] text-black">Cadence guide</p>
                </div>
                <div
                  className="h-[60px] py-[20px]"
                  onClick={() => {
                    setInputValue("Help me deploy a smart contract")
                  }}
                >
                  <p className="text-[16px] text-black">Deploy smart contract</p>
                </div>
                <div
                  className="h-[60px] py-[20px]"
                  onClick={() => {
                    setInputValue("Help me debug my code")
                  }}
                >
                  <p className="text-[16px] text-black">Debug Code</p>
                </div>
                <div
                  className="h-[60px] py-[20px]"
                  onClick={() => {
                    setInputValue("Find vulnerabilities in my code")
                  }}
                >
                  <p className="text-[16px] text-black">Find Vulnerabilities</p>
                </div>
              </div>
            </div>

            <div className=" bg-white w-[310px] h-[60px] rounded-[18px] flex flex-row items-center justify-between p-[14px] shadow-NFT">
              <span className="text-[16px] text-black">Discord</span>
              <img src="/discord.svg" className="h-[24px] w-[24px]" alt="" />
            </div>

            <div className=" bg-white w-[310px] h-[60px] rounded-[18px] flex flex-row items-center justify-between p-[14px] shadow-NFT">
              <span className="text-[16px] text-black">Github</span>
              <img src="/github.svg" className="h-[24px] w-[24px]" alt="" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-[24px]">
          <p className="text-[32px] font-bold text-[#6B7B72]">What may I do for you?</p>
          <div
            className={`messages transition-all ${
              isExpanded ? "h-max" : "h-[40px]"
            } overflow-auto no-scrollbar`}
            ref={messagesRef}
          >
            <div className="entered-values transition-opacity w-[1032px] ">
              {enteredValues.map((value, index) => (
                <div
                  key={index}
                  className={`entered-value text-[32px] font-bold text-wrap  ${
                    value.type === "user"
                      ? "text-right ml-[160px] text-primary"
                      : "text-left mr-[160px] text-[#7C9085]"
                  }`}
                >
                  {value.message}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type here..."
              className="border-0 text-primary outline-none bg-transparent text-[32px] font-bold w-[1032px]"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              ref={!isInputDisabled ? inputRef : null}
              disabled={isInputDisabled}
            />
          </div>

          <div className="output">
            {isLoading && (
              <div className="flex flex-row justify-center items-center">
                <Loader />
              </div>
            )}

            {outputContent}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-[16px] fixed bottom-[24px] right-[32px]">
        <button
          className="h-[48px] w-[194px] rounded-[12px] bg-background border-[#0FA958] border-[2px] text-[24px] text-[#0FA958] "
          onClick={clearOutput}
        >
          Next prompt
        </button>

        <div
          className="flex flex-col items-center justify-center w-[48px] h-[48px] bg-primary rounded-full cursor-pointer"
          onClick={handleToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className={isExpanded ? "rotate-180" : ""}
          >
            <path
              d="M11 1V21"
              stroke={!isDevMode ? "#D2FAE3" : "#262626"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 11L11 21L1 11"
              stroke={!isDevMode ? "#D2FAE3" : "#262626"}
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
