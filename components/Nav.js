import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import Image from "next/image"
import Router from "next/router"

import { CustomConnectButton } from "./CustomConnectButton"

export default function Nav() {
  const [name, setName] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false);

  const account = useAccount({
    async onConnect({ address }) {
      const endpoint = "../api/getByAddress/?address=" + address.toString()
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await fetch(endpoint, options)
      const name = await response.json()
      setName(name.split(" ").shift())
    },
  })

  useEffect(() => {
    console.log(name)
    if(name == "Will") {
      setIsAdmin(true);
    }
  })

  const goToAdmin = () => {
    Router.push(
      {
        pathname: "/claim"
      },
      "/claim"
    )
  }

  const goHome = () => {
    Router.push(
      {
        pathname: "/"
      },
      "/"
    )
  }


  return (
    <div className="bg-grey-light h-[69px] mb-[50px] flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
      <Image
        onClick={goHome}
        src="/ey_logo.png"
        width={50}
        height={50}
        className="float-left cursor-pointer"
        alt="EY Logo"
      />
      <div className="text-black font-bold flex justify-center lg:w-0 lg:flex-1">
        Hi {name}, welcome to your EY profile
      </div>
      {isAdmin && 
        <div>
          <button onClick={goToAdmin} className="bg-yellow-dark rounded-[50px] w-[100px] h-[36px] text-sm text-black mr-[20px]">Admin Page</button>
        </div>
      }
      
      <div className="md:flex items-center justify-end lg:w-0 w-full">
        <CustomConnectButton />
      </div>
    </div>
  )
}
