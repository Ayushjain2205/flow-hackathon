import React from "react"
import TemplateHolder from "../layout.js/TemplateHolder"

const SendMoney = () => {
  return (
    <div className="flex flex-row gap-[16px]">
      <TemplateHolder title="Send Money">
        <input
          type="number"
          placeholder="0"
          className="h-[65px] w-[105px] text-[64px] text-center focus:outline-none"
          name=""
          id=""
        />
        <span className="w-[65px] text-center text-[24px]">FLOW</span>

        <div className="flex flex-col gap-[16px]">
          <div className="form-control w-[306px] ">
            <label className="label">
              <span className="label-text text-[16px]">To who?</span>
            </label>
            <input
              type="text"
              className="input input-bordered border-[#DDD] rounded-[12px] w-full"
            />
          </div>

          <div className="form-control w-[306px] ">
            <label className="label">
              <span className="label-text text-[16px]">Any remarks?</span>
            </label>
            <input
              type="text"
              className="input input-bordered border-[#DDD] rounded-[12px] w-full"
            />
          </div>
        </div>

        <button className="rounded-[10px] w-[306px] h-[48px] text-[#CAFBDF] font-bold text-[16px] bg-[#262626] mt-[32px]">
          CONFIRM
        </button>
      </TemplateHolder>
      <TemplateHolder title="Send Money">
        <div className="flex flex-col gap-[16px] h-[365px]">
          <button className="rounded-[10px] w-[306px] h-[48px] text-[#262626] font-bold text-[16px] bg-[#FFF] mt-[32px] self-end">
            CANCEL
          </button>
        </div>
      </TemplateHolder>
    </div>
  )
}

export default SendMoney
