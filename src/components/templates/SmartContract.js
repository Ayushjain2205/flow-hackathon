import React, { useState } from "react"
import TemplateHolder from "../layout.js/TemplateHolder"
import { CopyBlock, vs2015 } from "react-code-blocks"

const code = `import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken

pub contract SampleNFT: NonFungibleToken.Contract {
    // Define the NFT resource
    pub resource SampleNFT: NonFungibleToken.NFT {
        // Unique ID of the NFT
        pub let id: UInt64
        // Owner of the NFT
        pub var owner: Address
        // Other fields for your NFT, such as name, description, metadata, etc.
        // ...

        // Initialize the NFT
        init(initID: UInt64) {
            self.id = initID
            self.owner = self.account.owner
        }
    }

    // Collection of NFTs
    pub let collection: @{UInt64: SampleNFT}

    // Mint a new NFT
    pub fun mintNFT(initID: UInt64): @SampleNFT {
        let newNFT <- create SampleNFT(initID: initID)
        self.collection[newNFT.id] = <-newNFT
        return <-newNFT
    }

    // Get NFT by ID
    pub fun getNFT(id: UInt64): &SampleNFT? {
        return self.collection[id]
    }

    // Transfer NFT to another account
    pub fun transferNFT(id: UInt64, to: Address) {
        let nft <- self.collection.remove(id: id)
            ?? panic("NFT does not exist")
        nft.owner = to
        self.collection[nft.id] = <-nft
    }
}
 `

const SmartContract = () => {
  const [isDeploying, setIsDeploying] = useState(false)

  const handleDeploy = () => {
    setIsDeploying(true)
  }

  return (
    <TemplateHolder title="Smart Contract">
      <div className="flex flex-col max-h-[540px] overflow-scroll no-scrollbar">
        <div className="w-[1032px] h-[450px] overflow-scroll no-scrollbar">
          <CopyBlock
            text={code}
            language="swift"
            showLineNumbers={false}
            theme={vs2015}
            codeBlock
          />
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="flex flex-row gap-[10px] items-center justify-center rounded-[10px] w-[197px] h-[48px] text-[#CAFBDF] font-bold text-[16px] bg-[#262626] mt-[32px]"
            onClick={handleDeploy}
            disabled={isDeploying}
          >
            {isDeploying ? (
              <>
                <span className="loading loading-spinner"></span>
                DEPLOYING
              </>
            ) : (
              "DEPLOY"
            )}
          </button>
        </div>
      </div>
    </TemplateHolder>
  )
}

export default SmartContract
