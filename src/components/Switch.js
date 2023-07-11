import React, { useState } from "react"

function Switch() {
  const [checked, setChecked] = useState(false)

  const handleToggle = () => {
    setChecked(!checked)
  }

  return (
    <label htmlFor="toggle" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id="toggle"
          className="sr-only"
          checked={checked}
          onChange={handleToggle}
        />
        <div className="w-[81px] h-[40px] bg-[#262626] rounded-full shadow-inner"></div>
        <div
          className={`flex flex-column justify-center items-center absolute inset-y-[4px] left-[4px] w-[33px] h-[33px] bg-[#D2FAE3] rounded-full shadow transition-transform duration-300 transform ${
            checked ? "translate-x-[40px]" : "translate-x-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M17 17.5L23 11.5L17 5.5"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 5.5L1 11.5L7 17.5"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M14.5 5L9.5 18" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </label>
  )
}

export default Switch