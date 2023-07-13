import React from "react"
import TemplateHolder from "../layout.js/TemplateHolder"

const Task = () => {
  return (
    <TemplateHolder title="Create a task">
      <div className="flex flex-col max-h-[540px] overflow-scroll no-scrollbar">
        <input
          type="text"
          className="input input-bordered border-[#DDD] rounded-[12px] w-[705px] focus:outline-none"
          value="Look for NFTs under 50 FLOW"
        />
        <div className="flex flex-row mt-[16px] gap-[9px]">
          <div className="flex flex-col items-center justify-center rounded-[12px] w-[69px] h-[45px] bg-[#D2FAE3] text-[16px] font-bold">
            FLOW
          </div>
          <input
            type="number"
            className="input input-bordered border-[#DDD] rounded-[12px] w-[104px] focus:outline-none"
            placeholder="Min"
          />
          <div className="flex flex-col items-center justify-center">to</div>
          <input
            type="number"
            className="input input-bordered border-[#DDD] rounded-[12px] w-[104px] focus:outline-none"
            placeholder="Max"
          />
        </div>

        <div className="flex flex-row justify-end">
          <button className="rounded-[10px] w-[174px] h-[48px] text-[#CAFBDF] font-bold text-[16px] bg-[#262626] mt-[32px]">
            SAVE
          </button>
        </div>
      </div>
    </TemplateHolder>
  )
}

export default Task
