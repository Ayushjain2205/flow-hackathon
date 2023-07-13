import React from "react"
import TemplateHolder from "../layout.js/TemplateHolder"

const WalletHealth = () => {
  return (
    <div>
      <TemplateHolder title="About wallet">
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-row w-[413px] justify-between">
            <span className="text-black text-[20px]">TOKEN</span>
            <span className="text-[#0FA958] font-bold text-[20px]">FLOW</span>
          </div>
          <div className="flex flex-row w-[413px] justify-between">
            <span className="text-black text-[20px]">Balance</span>
            <span className="text-[#0FA958] font-bold text-[20px]">700 FLOW</span>
          </div>
          <div className="flex flex-row w-[413px] justify-between">
            <span className="text-black text-[20px]">Portfolio</span>
            <span className="text-[#0FA958] font-bold text-[20px]">426 FLOW</span>
          </div>
          <div className="flex flex-row w-[413px] justify-between">
            <span className="text-black text-[20px]">Health score</span>
            <span className="text-[#007BFF] font-bold text-[20px]">74/100</span>
          </div>
          <div className="flex flex-row w-[413px] justify-between">
            <span className="text-black text-[20px]">Exposure</span>
            <span className="text-[#007BFF] font-bold text-[20px]">False 👍</span>
          </div>
          <hr />
          <div className="flex flex-row w-[413px] justify-between">
            <span className="text-black text-[20px]">Top NFTs</span>
          </div>
          <div className="flex flex-row w-[413px] justify-between">
            <span className="text-black text-[20px]">SDMToken</span>
            <span className="text-[#007BFF] font-bold text-[20px]">
              <a href="" target="_blank" referrerPolicy="no-referrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </span>
          </div>
          <div className="flex flex-row w-[413px] justify-between">
            <span className="text-black text-[20px]">FLOWiykiyk</span>
            <span className="text-[#007BFF] font-bold text-[20px]">
              <a href="" target="_blank" referrerPolicy="no-referrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </span>
          </div>
          <div className="flex flex-row w-[413px] justify-between">
            <span className="text-black text-[20px]">ELC</span>
            <span className="text-[#007BFF] font-bold text-[20px]">
              <a href="" target="_blank" referrerPolicy="no-referrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </TemplateHolder>
    </div>
  )
}

export default WalletHealth
