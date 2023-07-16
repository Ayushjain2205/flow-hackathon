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
            <NFTCard
              name="Deni Avdija Block"
              img="https://assets.nbatopshot.com/media/2777543?width=256"
              number="#2893"
              price="1 FLOW"
            />
            <NFTCard
              name="Julius Randle Mid-Range"
              img="https://assets.nbatopshot.com/media/39359200?width=256"
              number="#4553"
              price="1 FLOW"
            />
            <NFTCard
              name="Derrick White Block"
              img="https://assets.nbatopshot.com/media/12307169?width=256"
              number="#1129"
              price="1 FLOW"
            />
            <NFTCard
              name="Jalen Green 3 Pointer "
              img="https://assets.nbatopshot.com/media/3599772?width=256"
              number="#3409"
              price="1 FLOW"
            />
            <NFTCard
              name="Derrick White Block"
              img="https://assets.nbatopshot.com/media/12307169?width=256"
              number="#1129"
              price="1 FLOW"
            />
            <NFTCard
              name="Lebron James 3 Pointer "
              img="https://assets.nbatopshot.com/media/3599772?width=256"
              number="#3409"
              price="1 FLOW"
            />
            <NFTCard
              name="Deni Avdija Block"
              img="https://assets.nbatopshot.com/media/2777543?width=256"
              number="#2893"
              price="1 FLOW"
            />
            <NFTCard
              name="Jalen Green 3 Pointer "
              img="https://assets.nbatopshot.com/media/39359200?width=256"
              number="#3409"
              price="1 FLOW"
            />
          </div>
        </div>
      </TemplateHolder>
    </div>
  )
}

export default BuyNFT
