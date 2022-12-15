import { ethers } from "ethers"
import { tokenAbi } from "../../utils/tokenAbi"

import nc from "next-connect"
const mintToken = nc({
  onError: (err, req, res, next) => {
    console.log(err)
    res.status(500).end(err.toString())
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ error: { message: "route not found" } })
    return
  },
  attachParams: true,
}).post(async (req, res) => {
  const addresses = req.body.addresses
  const tokenId = req.body.tokenId
  const amount = req.body.amount

  console.log(addresses, tokenId, amount)

  const privateKey = process.env.PRIVATE_KEY

  const provider = new ethers.providers.InfuraProvider(
    "maticmum",
    process.env.NEXT_PUBLIC_INFURA_KEY
  )

  console.log("Issuing NFTs...")

  const signer = new ethers.Wallet(privateKey, provider)

  const contract = new ethers.Contract(
    process.env.TOKEN_CONTRACT,
    tokenAbi,
    signer
  )

  try {
    console.log("Minting token...")
    res.status(200).json({ Response: { message: "Transaction completed!!" } })
    const tx = await contract.mintBatch(addresses, tokenId, amount)
    console.log(`https://mumbai.polygonscan.com/tx/${tx.hash}`)
    // const receipt = await tx.wait()
  } catch (error) {
    throw error
  }
})

export default mintToken
