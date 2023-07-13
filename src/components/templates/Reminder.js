import React from "react"
import TemplateHolder from "../layout.js/TemplateHolder"

const Reminder = () => {
  return (
    <TemplateHolder title="Create a reminder">
      <div className="flex flex-col max-h-[540px] overflow-scroll no-scrollbar">
        <input
          type="text"
          className="input input-bordered border-[#DDD] rounded-[12px] w-[705px]"
        />
        <span className="mt-[8px] text-[14px] text-opacity-50 text-[#262626]">
          You’ll receive updates on your registered emailID!
        </span>
        <div className="flex flex-row justify-end">
          <button className="rounded-[10px] w-[174px] h-[48px] text-[#CAFBDF] font-bold text-[16px] bg-[#262626] mt-[32px]">
            SAVE
          </button>
        </div>
      </div>
    </TemplateHolder>
  )
}

export default Reminder
