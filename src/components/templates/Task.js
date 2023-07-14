import React, { useState, useEffect } from "react"
import TemplateHolder from "../layout.js/TemplateHolder"

const Task = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
  }
  useEffect(() => {
    if (isSaving) {
      setTimeout(() => {
        setIsSaving(false)
        setIsSaved(true)
      }, 2000)
    }
  }, [isSaving])
  return (
    <div>
      <TemplateHolder title="Create a task">
        <div className="flex flex-col max-h-[540px] overflow-scroll no-scrollbar">
          <input
            type="text"
            className="input input-bordered border-[#DDD] rounded-[12px] w-[705px] focus:outline-none text-black"
            value="Look for NFTs under 50 FLOW"
          />
          <div className="flex flex-row mt-[16px] gap-[9px]">
            <div className="flex flex-col items-center justify-center rounded-[12px] w-[69px] h-[45px] bg-[#D2FAE3] text-[16px] font-bold text-black">
              FLOW
            </div>
            <input
              type="number"
              className="input input-bordered border-[#DDD] rounded-[12px] w-[104px] focus:outline-none text-black"
              placeholder="Min"
            />
            <div className="flex flex-col items-center justify-center text-black">to</div>
            <input
              type="number"
              className="input input-bordered border-[#DDD] rounded-[12px] w-[104px] focus:outline-none text-black"
              placeholder="Max"
            />
          </div>

          <div className="flex flex-row justify-end">
            <button
              className="flex flex-row gap-[10px] items-center justify-center rounded-[10px] w-[174px] h-[48px] text-[#CAFBDF] font-bold text-[16px] bg-[#262626] mt-[32px]"
              onClick={handleSave}
            >
              {isSaving ? (
                <>
                  <span className="loading loading-spinner"></span>
                  SAVING
                </>
              ) : (
                "SAVE"
              )}
            </button>
          </div>
        </div>
      </TemplateHolder>
      {isSaved && (
        <p className="text-[32px] font-bold mt-[24px] text-black">
          Wohooo! Creating Task was successful
        </p>
      )}
    </div>
  )
}

export default Task
