import React, { useState, useEffect } from "react"
import TemplateHolder from "../layout.js/TemplateHolder"
import { CopyBlock, vs2015 } from "react-code-blocks"
import Lottie from "react-lottie-player"
import loading from "../../helpers/loading.json"

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
  const [isGenerating, setIsGenerating] = useState(true)
  const [displayText, setDisplayText] = useState("Comprehending..")

  const handleDeploy = () => {
    setIsDeploying(true)
  }

  useEffect(() => {
    let intervalId

    if (isGenerating) {
      const texts = ["Generating code", "Creating....", "Give me a moment"]
      let currentIndex = 0

      intervalId = setInterval(() => {
        setDisplayText(texts[currentIndex])
        currentIndex++

        if (currentIndex === texts.length) {
          clearInterval(intervalId)
          setIsGenerating(false)
        }
      }, 1500)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isGenerating])

  return (
    <TemplateHolder title="Smart Contract">
      <div className="flex flex-col max-h-[540px] w-[1032px] overflow-scroll no-scrollbar">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-[450px]">
            <Lottie loop animationData={loading} play style={{ width: 117, height: 117 }} />
            <p className="text-[16px] text-center text-black">{displayText}</p>
          </div>
        ) : (
          <div className="w-[1032px] h-[450px] overflow-scroll no-scrollbar">
            <CopyBlock
              text={code}
              language="swift"
              showLineNumbers={false}
              theme={vs2015}
              codeBlock
            />
          </div>
        )}
        <div className="flex flex-row justify-end">
          {!isGenerating && (
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
          )}
        </div>
      </div>
    </TemplateHolder>
  )
}

export default SmartContract
