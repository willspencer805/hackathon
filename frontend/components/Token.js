import { useEffect, useState } from "react"
import Image from "next/image"
import { useContractRead } from "wagmi"
import { useAccount } from "wagmi"
import { abi } from "../utils/guildAbi"
import styles from "../styles/Profile.module.css"
import placeholder from "../public/dashed-box.png"
function Token({ tokenId }) {
  const [url, setUrl] = useState(null)
  const [name, setName] = useState(null)
  const [owned, setOwned] = useState(false)
  const { address } = useAccount()
  const endpoint =
    "https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/" +
    tokenId

  const contractRead = useContractRead({
    address: process.env.NEXT_PUBLIC_GUILD_CONTRACT,
    abi: abi,
    functionName: "balanceOf",
    chainId: 137,
    args: [address, tokenId],
    onSuccess(data) {
      if (data > 0) {
        setOwned(true)
      }
    },
  })

  useEffect(() => {
    async function getData() {
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await fetch(endpoint, options)
      const data = await response.json()
      setUrl(data.image)
      setName(data.name)
    }
    getData()
  }, [url])

  return (
    <>
      {owned ? (
        url ? (
          <div>
            <Image
              src={url}
              width={300}
              height={300}
              alt="nft"
              className={styles.gridItem}
            ></Image>
            {name}
          </div>
        ) : (
          <>Loading</>
        )
      ) : (
        <div>
          <Image src={placeholder} width={300} height={300} alt="nft"></Image>
          {name}
        </div>
      )}
    </>
  )
}

export default Token
