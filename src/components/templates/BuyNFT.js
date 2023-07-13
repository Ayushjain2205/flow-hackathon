import React from "react"
import TemplateHolder from "../layout.js/TemplateHolder"
import NFTCard from "../cards/NFTCard"

const BuyNFT = () => {
  return (
    <div>
      <TemplateHolder title="Buy NFT">
        <div className="flex flex-col max-h-[540px] overflow-scroll no-scrollbar">
          <div className="flex flex-row justify-between ">
            <div className="form-control w-[183px] ">
              <select className="select select-bordered border-[#DDD] rounded-[12px] w-full">
                <option selected>Sports</option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </div>
            <button className="rounded-[10px] w-[209px] h-[48px] text-[#CAFBDF] font-bold text-[16px] bg-[#262626] flex items-center justify-center gap-[8px]">
              <span className="h-[24px] text-[16px]"> Buy on Flowverse</span>
              <img src="/link.svg" alt="" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-[24px] mt-[18px]">
            <NFTCard />
            <div className="flex flex-col h-[285px] w-[240px] bg-[#F6F6F6] rounded-[12px] shadow-NFT">
              <img
                src="https://assets.nbatopshot.com/media/39359200?width=256"
                alt=""
                className="h-[227px] w-full rounded-t-[12px]"
              />
              <div className="flex flex-col p-[8px]">
                <div className="text-[14px] font-bold mb-[4px]">Julius Randle Mid-Range </div>
                <div className="flex flex-row justify-between">
                  <span className="text-[14px]">#2893</span>
                  <span className="text-[14px]"> 1 FLOW</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-[285px] w-[240px] bg-[#F6F6F6] rounded-[12px] shadow-NFT">
              <img
                src="https://assets.nbatopshot.com/media/12307169?width=256"
                alt=""
                className="h-[227px] w-full rounded-t-[12px]"
              />
              <div className="flex flex-col p-[8px]">
                <div className="text-[14px] font-bold mb-[4px]">Derrick White Block </div>
                <div className="flex flex-row justify-between">
                  <span className="text-[14px]">#1129</span>
                  <span className="text-[14px]"> 1 FLOW</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-[285px] w-[240px] bg-[#F6F6F6] rounded-[12px] shadow-NFT">
              <img
                src="https://assets.nbatopshot.com/media/3599772?width=256"
                alt=""
                className="h-[227px] w-full rounded-t-[12px]"
              />
              <div className="flex flex-col p-[8px]">
                <div className="text-[14px] font-bold mb-[4px]">Jalen Green 3 Pointer </div>
                <div className="flex flex-row justify-between">
                  <span className="text-[14px]">#3409</span>
                  <span className="text-[14px]"> 1 FLOW</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-[285px] w-[240px] bg-[#F6F6F6] rounded-[12px] shadow-NFT">
              <img
                src="https://assets.nbatopshot.com/media/2777543?width=256"
                alt=""
                className="h-[227px] w-full rounded-t-[12px]"
              />
              <div className="flex flex-col p-[8px]">
                <div className="text-[14px] font-bold mb-[4px]">Deni Avdija Block </div>
                <div className="flex flex-row justify-between">
                  <span className="text-[14px]">#4459</span>
                  <span className="text-[14px]"> 1 FLOW</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-[285px] w-[240px] bg-[#F6F6F6] rounded-[12px] shadow-NFT">
              <img
                src="https://assets.nbatopshot.com/media/39359200?width=256"
                alt=""
                className="h-[227px] w-full rounded-t-[12px]"
              />
              <div className="flex flex-col p-[8px]">
                <div className="text-[14px] font-bold mb-[4px]">Julius Randle Mid-Range </div>
                <div className="flex flex-row justify-between">
                  <span className="text-[14px]">#2893</span>
                  <span className="text-[14px]"> 1 FLOW</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-[285px] w-[240px] bg-[#F6F6F6] rounded-[12px] shadow-NFT">
              <img
                src="https://assets.nbatopshot.com/media/12307169?width=256"
                alt=""
                className="h-[227px] w-full rounded-t-[12px]"
              />
              <div className="flex flex-col p-[8px]">
                <div className="text-[14px] font-bold mb-[4px]">Derrick White Block </div>
                <div className="flex flex-row justify-between">
                  <span className="text-[14px]">#1129</span>
                  <span className="text-[14px]"> 1 FLOW</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-[285px] w-[240px] bg-[#F6F6F6] rounded-[12px] shadow-NFT">
              <img
                src="https://assets.nbatopshot.com/media/3599772?width=256"
                alt=""
                className="h-[227px] w-full rounded-t-[12px]"
              />
              <div className="flex flex-col p-[8px]">
                <div className="text-[14px] font-bold mb-[4px]">Jalen Green 3 Pointer </div>
                <div className="flex flex-row justify-between">
                  <span className="text-[14px]">#3409</span>
                  <span className="text-[14px]"> 1 FLOW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TemplateHolder>
    </div>
  )
}

export default BuyNFT
