import React from "react"
const https = require("https")
import axios from "axios"

const TokenMetadata = () => {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [file, setFile] = React.useState(null)
  const [ipfsHash, setIpfsHash] = React.useState(null)

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // do something with the form data here
    console.log(name, description, file)

    const projectId = "2FdLREdMWVTzCZXvetszPIZLoJp"
    const projectSecret = "ecd29287d3ee4d821db0347005875fc6"

    // First, add and pin image to IPFS
    // const formData = new FormData()
    // formData.append("file", file, "nft-image")

    // try {
    //   const res = await axios.post(
    //     "https://ipfs.infura.io:5001/api/v0/add",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: "Basic " + btoa(`${projectId}:${projectSecret}`),
    //       },
    //     }
    //   )

    //   setIpfsHash(res.data.Hash)
    // } catch (error) {
    //   console.error(error)
    // }

    // create json including name, description, and pinned QID
    const metadata = {
      name: name,
      description: description,
      image: `sgf.infura-ipfs.io/ipfs/${ipfsHash}`,
    }

    // const jsonForm = new FormData()
    // const jsonBlob = new Blob([JSON.stringify(metadata)], {
    //   type: "application/json",
    // })
    // jsonForm.append("json", jsonBlob, "token-metadata.json")

    // pin the json object to ipfs
    // try {
    //   const res = await axios.post(
    //     "https://ipfs.infura.io:5001/api/v0/add",
    //     jsonForm,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: "Basic " + btoa(`${projectId}:${projectSecret}`),
    //       },
    //     }
    //   )
    //   console.log(res.data.Hash)
    // } catch (error) {
    //   console.error(error)
    // }

    const addresses = [
      "0xA42Ca9055c8875972aDC1c7AB9F84783594f2e8B",
      "0xCAEe1AC3c58FFC6dB49ac963f73bbb09AF623bE7",
    ]

    // finally, mint the nft off the contract
    const nftEndpoint = "../api/mintToken"
    const nftOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addresses: addresses,
        tokenId: 1, // TODO
        amount: 1,
      }),
    }
    await fetch(nftEndpoint, nftOptions)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>
      <label>
        Image:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default TokenMetadata
