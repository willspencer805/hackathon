import nc from "next-connect"
import axios from "axios"
const https = require("https")

const pinImage = nc({
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
  const projectId = process.env.PROJECT_ID
  const projectSecret = process.env.PROJECT_SECRET

  // const formData = JSON.parse(req.body.formData)
  const file = req.body.file
  // console.log("IN API: ", file)

  // Pin and add image to IPFS
  // const imageForm = new FormData()
  // imageForm.append("image", file, "nft-image")

  // try {
  //   console.log("Pinning image...")
  //   const res = await axios.post(
  //     "https://ipfs.infura.io:5001/api/v0/add",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization:
  //           "Basic " +
  //           Buffer.from(`${projectId}:${projectSecret}`).toString("base64"),
  //       },
  //     }
  //   )
  //   console.log("Successfully pinned: ", res.data.hash)
  //   return res.data.hash
  // } catch (error) {
  //   throw error
  // }
})

export default pinImage
