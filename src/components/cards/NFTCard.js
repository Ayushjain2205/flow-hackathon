import React from "react"

const NFTCard = () => {
  return (
    <a
      href="https://nft.flowverse.co/collections/TopShot/0x148f39d7db3ecf21/8159211"
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex flex-col h-[285px] w-[240px] bg-[#F6F6F6] rounded-[12px] shadow-NFT">
        <img
          src="https://assets.nbatopshot.com/media/2777543?width=256"
          alt=""
          className="h-[227px] w-full rounded-t-[12px]"
        />
        <div className="flex flex-col p-[8px]">
          <div className="text-[14px] font-bold mb-[4px] text-black">Deni Avdija Block </div>
          <div className="flex flex-row justify-between">
            <span className="text-[14px] text-black">#4459</span>
            <span className="text-[14px] text-black"> 1 FLOW</span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default NFTCard
