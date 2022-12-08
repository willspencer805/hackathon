import { tokenIds } from "../utils/tokenIds"
import React, { useEffect, useState } from "react"
import {FaSearch } from "react-icons/fa";
import Token from "../components/Token"
import styles from "../styles/Profile.module.css"

export default function Profile() {
  function showTokens() {
    let arr = []
    tokenIds.map((id) => {
      arr.push(
        <div key={id}>
          <Token tokenId={id}></Token>
        </div>
      )
    })
    return arr
  }

  return <div>
    <div className="text-xl ml-[25px] mr-[25px] mb-[20px] flex">
      <div className="justify start">My Wallet</div>
        <div className="flex ml-auto">
          <FaSearch className="text-[22px] mt-[5px]"/>
          <input className="ml-2 h-[37px] w-[258px] text-base bg-transparent border-solid border-[2px] border-grey-light p-2
              focus:outline-none
              placeholder:text-base placeholder:text-black placeholder:opacity-60 placeholder:ml-[2px]"
            placeholder="Search my Wallet"/>
        </div>
      </div>
      <div className="m-10">
        <div className={styles.grid}>{showTokens()}</div>
      </div>
    </div>

}
