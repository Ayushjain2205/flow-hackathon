import React from "react"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { AuthProvider } from "../components/AuthProvider"
import { ComponentWithAuth } from "../components/ComponentWithAuth"
import Head from "next/head"
import { NiftoryClientProvider } from "graphql/niftoryClientProvider"
import { NiftoryWalletInitializer } from "@components/NiftoryWalletInitializer"
import "./global.css"

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithAuth
}

const App = ({ Component, pageProps: { session, auth, ...pageProps } }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Aigent - By Entropy Labs</title>
      </Head>
      <SessionProvider session={session} refetchInterval={60 * 60}>
        <AuthProvider requireAuth={Component.requireAuth}>
          <NiftoryClientProvider>
            <ChakraProvider>
              <NiftoryWalletInitializer />
              <Component {...pageProps} />
            </ChakraProvider>
          </NiftoryClientProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  )
}

export default App
