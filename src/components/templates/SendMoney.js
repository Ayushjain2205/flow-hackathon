import React, { useState, useEffect } from "react"
import TemplateHolder from "../layout.js/TemplateHolder"
import Lottie from "react-lottie-player"
import loading from "../../helpers/loading.json"

const SendMoney = () => {
  const [isConfirmClicked, setIsConfirmClicked] = useState(false)
  const [displayText, setDisplayText] = useState("Sending your details")

  const handleConfirmClick = () => {
    setIsConfirmClicked(true)
  }

  useEffect(() => {
    let intervalId

    if (isConfirmClicked) {
      const texts = [
        "Thinking..",
        "Sending transaction details",
        "Verifying",
        "In the waiting room",
      ]
      let currentIndex = 0

      intervalId = setInterval(() => {
        setDisplayText(texts[currentIndex])
        currentIndex++

        if (currentIndex === texts.length) {
          clearInterval(intervalId)
        }
      }, 2500)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isConfirmClicked])

  return (
    <div>
      <div className="flex flex-row gap-[16px]">
        <TemplateHolder title="Send Money">
          <input
            type="number"
            placeholder="0"
            className="h-[65px] w-[105px] text-[64px] text-center focus:outline-none text-black"
            name=""
            id=""
          />
          <span className="w-[65px] text-center text-[24px] text-black">FLOW</span>

          <div className="flex flex-col gap-[16px]">
            <div className="form-control w-[306px] ">
              <label className="label">
                <span className="label-text text-[16px] text-black">To who?</span>
              </label>
              <input
                type="text"
                className="input input-bordered border-[#DDD] rounded-[12px] w-full"
              />
            </div>

            <div className="form-control w-[306px] ">
              <label className="label">
                <span className="label-text text-[16px] text-black">Any remarks?</span>
              </label>
              <input
                type="text"
                className="input input-bordered border-[#DDD] rounded-[12px] w-full"
              />
            </div>
          </div>

          <button
            className="rounded-[10px] w-[306px] h-[48px] text-[#CAFBDF] font-bold text-[16px] bg-[#262626] mt-[32px]"
            onClick={handleConfirmClick}
          >
            CONFIRM
          </button>
        </TemplateHolder>
        {isConfirmClicked && (
          <TemplateHolder title="Send Money">
            <div className="flex flex-col items-center gap-[16px] h-[365px]">
              <div className="flex flex-col items-center justify-between mt-[60px]">
                <Lottie loop animationData={loading} play style={{ width: 117, height: 117 }} />
                <p className="text-[16px] text-center text-black">{displayText}</p>
              </div>
              <button className="rounded-[10px] w-[306px] h-[48px] text-[#262626] font-bold text-[16px] bg-[#FFF] mt-auto self-end">
                CANCEL
              </button>
            </div>
          </TemplateHolder>
        )}
      </div>
      {isConfirmClicked && (
        <p className="text-[32px] font-bold mt-[24px] text-black">
          Wohooo! Sending FLOW was successful
        </p>
      )}
    </div>
  )
}

export default SendMoney
