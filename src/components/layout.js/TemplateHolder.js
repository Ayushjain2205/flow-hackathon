import React from "react"

const TemplateHolder = ({ title, children }) => {
  return (
    <div className="rounded-[18px] bg-white min-h-[200px]">
      <div className="h-[60px] flex flex-row justify-between p-[16px] bg-[#f8f8f8] rounded-t-[18px] text-[20px]">
        <p>{title}</p>
        <img className="h-[24px] rotate-45 cursor-pointer" src="/plus.svg" alt="" />
      </div>
      <div className="flex flex-col p-[16px] pt-[24px]">{children}</div>
    </div>
  )
}

export default TemplateHolder
