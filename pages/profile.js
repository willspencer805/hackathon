import { tokenIds } from "../utils/tokenIds"
import React, { useEffect, useState } from "react"
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

  return <div className={styles.grid}>{showTokens()}</div>
}
