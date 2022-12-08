import { useEffect, useState } from "react"
import Image from "next/image"
import { useContractRead } from "wagmi"
import { useAccount } from "wagmi"
import badge from "../public/badge.png"
import styles from "../styles/Profile.module.css"
import placeholder from "../public/dashed-box.png"
import hack from "../public/hackathon.png"
function Token({ tokenId, contractAddress, unique, abi, type }) {
  const [url, setUrl] = useState(null)
  const [name, setName] = useState(null)
  const [owned, setOwned] = useState(false)
  const { address } = useAccount()
  const endpoint =
    "https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/" +
    tokenId

  let chainId
  if (type == "hack") {
    chainId = 80001
  } else {
    chainId = 137
  }

  const contractRead = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "balanceOf",
    // chainId: type == "hack" ? 80001 : 137,
    // chainId: 137,
    chainId: chainId,
    args: unique ? [address] : [address, tokenId],
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
      try {
        const response = await fetch(endpoint, options)
        const data = await response.json()
        setUrl(data.image)
        setName(data.name)
      } catch (error) {
        console.log(error)
      }
    }
    if (type == "guild") {
      getData()
    } else if (type == "hack") {
      setUrl(
        "https://sgf.infura-ipfs.io/ipfs/Qmecj5LzRMTtGksLyVrA4fagTJHknmeoxb7dn4JMJ2vyHP"
      )
      setName("EY Blockchain Hackathon")
    } else {
      setName("EY Blockchain Badge")
    }
  }, [url])

  if (type == "hack") {
    return (
      <div>
        <Image
          src={hack}
          width={300}
          height={300}
          alt="nft"
          className={styles.gridItem}
        ></Image>
        {name}
      </div>
    )
  }

  if (unique && owned) {
    return (
      <div>
        <Image
          src={badge}
          width={300}
          height={300}
          alt="nft"
          className={styles.gridItem}
        ></Image>
        {name}
      </div>
    )
  }

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
