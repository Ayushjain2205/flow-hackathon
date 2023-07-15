import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { Center, Box, VStack, Text, Button } from "@chakra-ui/react"
import { WalletDetails } from "ui/Wallet/WalletDetails"
import { Logout } from "@components/Logout"

import { useAuthContext } from "hooks/useAuthContext"

import { FaGoogle } from "react-icons/fa"
import { useWalletQuery } from "@niftory/sdk"

const HomePage = () => {
  const router = useRouter()
  const { session, signIn, isLoading } = useAuthContext()

  const [{ data, fetching: walletFetching }] = useWalletQuery()

  const wallet = data?.wallet
  const fetching = walletFetching || isLoading

  useEffect(() => {
    if (session) {
      router.push({
        pathname: "/chat",
        query: { walletAddress: wallet?.address }, // Pass wallet address as query parameter
      })
    }
  }, [session])

  return (
    <div className="h-screen flex flex-col items-center justify-between align-center">
      <div className="flex flex-col m-auto items-center">
        <img className="h-[177px] w-[164px]" src="/logo.png" alt="" />
        <span className="font-bold text-[36px] text-[#0FA958] w-[164px] text-center">FLOW.AI</span>
        <button
          className="w-[249px] h-[60px] border border-[2px] border-[#0FA958] rounded-[10px] text-[24px] mt-[72px]"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
    // <AppLayout>
    //   <Center py={{ base: "1rem" }} flexDir="column" position="relative">
    //     <Box px="1rem">
    //       <VStack>
    //         {!session && (
    //           <Box pt="200">
    //             <Text p="5" textAlign="center" fontWeight="semibold" fontSize="xl">
    //               Login to get started!
    //             </Text>
    //             <Button
    //               p="8"
    //               isLoading={isLoading}
    //               onClick={() => signIn()}
    //               colorScheme="red"
    //               leftIcon={<FaGoogle />}
    //             >
    //               Sign in with Google
    //             </Button>
    //           </Box>
    //         )}
    //         {session && (
    //           <VStack>
    //             <WalletDetails
    //               isLoading={fetching}
    //               walletAddress={wallet?.address}
    //               walletItems={wallet?.nfts?.length}
    //               walletStatus={wallet?.state?.toString()}
    //               walletOwnerEmail={wallet?.appUser?.email}
    //             />
    //             <Logout />
    //           </VStack>
    //         )}
    //       </VStack>
    //     </Box>
    //   </Center>
    // </AppLayout>
  )
}

export default HomePage
