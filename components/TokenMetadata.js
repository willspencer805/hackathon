import React from "react"
const https = require("https")
import axios from "axios"
import styles from "../styles/Profile.module.css"

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

    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
    const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET

    // First, add and pin image to IPFS
    const formData = new FormData()
    formData.append("file", file, "nft-image")

    try {
      const res = await axios.post(
        "https://ipfs.infura.io:5001/api/v0/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Basic " + btoa(`${projectId}:${projectSecret}`),
          },
        }
      )
      console.log("IMAGE: ", res.data.Hash)
      setIpfsHash(res.data.Hash)
    } catch (error) {
      console.error(error)
    }

    // create json including name, description, and pinned QID
    const metadata = {
      name: name,
      description: description,
      image: `sgf.infura-ipfs.io/ipfs/${ipfsHash}`,
    }

    const jsonForm = new FormData()
    const jsonBlob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    })
    jsonForm.append("json", jsonBlob, "token-metadata.json")

    // pin the json object to ipfs
    try {
      const res = await axios.post(
        "https://ipfs.infura.io:5001/api/v0/add",
        jsonForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Basic " + btoa(`${projectId}:${projectSecret}`),
          },
        }
      )
      console.log(res.data.Hash)
    } catch (error) {
      console.error(error)
    }

    // TODO!!!!!!
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
    // await fetch(nftEndpoint, nftOptions)
  }

  return (
    <div className="ml-[200px] mr-[200px]">
      <table className="w-full text-black">
        <tr>
          <td className="col-auto">
          <div className="flex relative float-left">
          <div className="bg-yellow-dark rounded-[20px] w-[160px] h-[40px] absolute -top-[20px] left-[25%] pt-[7px] pl-[30px]">Issue an NFT</div>
            <div className="bg-grey-light w-[330px] h-[310px] rounded">
              <form onSubmit={handleSubmit}>
                <div className="mt-[40px] ml-[20px]">
                  <div className="ml-[5%]">Name</div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Name of NFT"
                    className="bg-white rounded h-[25px] mt-[7px] pl-[5px] text-sm placeholder:text-xs"
                  />
                </div>
                <div className="mt-[20px] ml-[20px]">
                <div className="ml-[5%]">Description</div>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Description of NFT"
                    className="bg-white rounded h-[25px] mt-[7px] pl-[5px] text-sm placeholder:text-xs"
                  />
                </div>
                <div className="mt-[20px] ml-[20px]">
                  <div className="ml-[5%]">Art</div>
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={handleFileChange}
                    className="bg-white rounded h-[25px] mt-[7px]"
                  />
                </div>
                <div className="ml-auto">
                  <button className="bg-blue-medium rounded text-white text-sm float-right mt-[16px] mr-[15px] w-[65px] h-[30px]" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
        </div>
          </td>
          <td className="col-auto">
          <div className="flex relative float-right">
          <div className="bg-yellow-dark rounded-[20px] w-[160px] h-[40px] absolute -top-[20px] left-[25%] pt-[7px] pl-[30px]">Revoke an NFT</div>
          <div className="bg-grey-light w-[330px] h-[310px] rounded">
            <form>
              <div className="mt-[40px] ml-[20px]">
                <div className="ml-[5%]">Name</div>
                <input
                  type="text"
                  id="name"
                  placeholder="Name of NFT"
                  className="bg-white rounded h-[25px] mt-[7px] pl-[5px] text-sm placeholder:text-xs"
                />
              </div>
              <div className="mt-[20px] ml-[20px]">
              <div className="ml-[5%]">Profile</div>
                <input
                  type="text"
                  id="description"
                  placeholder="Email of user"
                  className="bg-white rounded h-[25px] mt-[7px] pl-[5px] text-sm placeholder:text-xs"
                />
              </div>
              <div className="mt-[20px] ml-[20px]">
                <div className="ml-[5%]">Group</div>
                  <input
                    type="text"
                    id="description"
                    placeholder="Distribution Group"
                    className="bg-white rounded h-[25px] mt-[7px] pl-[5px] text-sm placeholder:text-xs"
                  />
              </div>
              <div className="ml-auto">
                <button className="bg-blue-medium rounded text-white text-sm float-right mt-[16px] mr-[15px] w-[65px] h-[30px]" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default TokenMetadata
