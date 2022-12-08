import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useState } from "react"
import { useAccount } from "wagmi";
import Image from "next/image";

import { CustomConnectButton } from "./CustomConnectButton";


export default function Nav() {
  const [name, setName] = useState(null)
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
      const data = await response.json()
      setName(data.name)
    },
  })

  return (
    <div className="bg-yellow-light h-[69px] mb-[50px] flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
      <Image
              src="/ey_logo.png"
              width={50}
              height={50}
              className="float-left"
            />
      <div className="text-black font-bold flex justify-center lg:w-0 lg:flex-1">Hi {name}, welcome to your EY profile</div>

      <div className="md:flex items-center justify-end lg:w-0 w-full">
        <CustomConnectButton/>
      </div>
    </div>
  )
}
