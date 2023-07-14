import React, { useState } from "react"
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

const Debug = () => {
  const [isThinking, setIsThinking] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const handleThinking = () => {
    setIsThinking(true)

    setTimeout(() => {
      setIsReady(true)
      setIsThinking(false)
    }, 4000)
  }

  return (
    <TemplateHolder title="Debugging">
      <div className="flex flex-col max-h-[540px] overflow-scroll no-scrollbar">
        {isReady ? (
          <div className="flex flex-row w-[1032px] gap-[24px]">
            <div className="flex flex-col justify-end">
              <div className="flex flex-col gap-[12px] border-[#DDD] rounded-[12px] w-[500px] h-[450px]">
                <div className="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <strong>Line 25 : </strong> expected token &apos; &#125; &apos;
                  </span>
                </div>
                <div className="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <strong>Line 28 : </strong>statements on the same line must be separated with a
                    semicolon
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="w-[500px] h-[450px] overflow-scroll no-scrollbar">
                <CopyBlock
                  text={code}
                  language="swift"
                  showLineNumbers={false}
                  theme={vs2015}
                  codeBlock
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[450px] gap-[24px]">
            <textarea
              type="text"
              placeholder="Paste your code here"
              className="input input-bordered border-[#DDD] rounded-[12px] w-[1000px] h-[151px] text-black"
            />
            {isThinking && (
              <div className="flex flex-col items-center justify-between mt-[60px]">
                <Lottie loop animationData={loading} play style={{ width: 117, height: 117 }} />
                <p className="text-[16px] text-center text-black">Thinking...</p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-row justify-end">
          <button
            className="flex flex-row  gap-[10px] items-center justify-center rounded-[10px] w-[197px] h-[48px] text-[#CAFBDF] font-bold text-[16px] bg-[#262626] mt-[32px]"
            onClick={handleThinking}
            disabled={isThinking}
          >
            {isThinking ? (
              <>
                <span className="loading loading-spinner"></span>
                DEBUGGING
              </>
            ) : (
              "DEBUG"
            )}
          </button>
        </div>
      </div>
    </TemplateHolder>
  )
}

export default Debug
