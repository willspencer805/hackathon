import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { infuraProvider } from "wagmi/providers/infura"
function MyApp({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [chain.polygon, chain.polygonMumbai],
    [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY })]
  )

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  })

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
