import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useState } from "react"
import { useAccount } from "wagmi"

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
    <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
      <div className="flex justify-start lg:w-0 lg:flex-1">Hello {name}!</div>

      <nav className="hidden md:flex space-x-10">
        <a
          href="/"
          className="text-base font-medium text-gray-500 hover:text-gray-900"
        >
          Profile
        </a>
        <a
          href="/claim"
          className="text-base font-medium text-gray-500 hover:text-gray-900"
        >
          Claim
        </a>
      </nav>

      <div className="md:flex items-center justify-end md:flex-1 lg:w-0 w-full">
        <ConnectButton />
      </div>
    </div>
  )
}
