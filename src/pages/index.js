import React from "react"

const HomePage = () => {
  return (
    <div className="min-h-screen px-[32px] py-[24px]">
      <div className="navbar mb-[42px] p-0">
        <div className="flex-1">
          <a className="font-bold text-[36px] text-[#0FA958]">FLOW-Agent</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-row">
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
                <p className="text-[16px]">Know wallet health </p>
              </div>
              <div className="h-[60px] py-[20px]">
                <p className="text-[16px]">BUY A NFT </p>
              </div>
              <div className="h-[60px] py-[20px]">
                <p className="text-[16px]">Send FLOW </p>
              </div>
              <div className="h-[60px] py-[20px]">
                <p className="text-[16px]">Set budget for scouting </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-column"></div>
      </div>
    </div>
  )
}

export default HomePage
