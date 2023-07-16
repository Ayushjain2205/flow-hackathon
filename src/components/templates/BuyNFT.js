import React, { useEffect, useState } from "react"
import TemplateHolder from "../layout.js/TemplateHolder"
import NFTCard from "../cards/NFTCard"
import { getNFTData } from "../helpers"

const BuyNFT = () => {
  const [nftData, setNftData] = useState([])

  useEffect(() => {
    getNFTData().then((data) => setNftData(data))
  }, [])

  return (
    <div>
      <TemplateHolder title="Buy NFT">
        <div className="flex flex-col max-h-[540px] overflow-scroll no-scrollbar">
          <div className="flex flex-row justify-between ">
            <div className="form-control w-[183px] ">
              <select className="select select-bordered border-[#DDD] rounded-[12px] w-full text-black">
                <option selected>Sports</option>
                <option>Music</option>
                <option>Collectible</option>
                <option>Fashion</option>
                <option>Art</option>
              </select>
            </div>
            <button className="rounded-[10px] w-[209px] h-[48px] text-[#CAFBDF] font-bold text-[16px] bg-[#262626] flex items-center justify-center gap-[8px]">
              <a
                href="https://nft.flowverse.co/marketplace/TopShot"
                target="_blank"
                rel="noreferrer"
                className="h-[24px] text-[16px]"
              >
                Buy on Flowverse
              </a>
              <img src="/link.svg" alt="" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-[24px] mt-[18px]">
            {nftData.map((nft, index) => (
              <NFTCard
                key={index}
                name={nft.name}
                img={nft.img}
                link={nft.link}
                number={nft.number}
                price={nft.price}
              />
            ))}
          </div>
        </div>
      </TemplateHolder>
    </div>
  )
}

export default BuyNFT
