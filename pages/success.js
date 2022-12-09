import { useRouter } from "next/router"
import Nav from "../components/Nav"
import styles from "../styles/Home.module.css"

export default function Claim() {
  const router = useRouter()

  function handleClick() {
    router.push("/")
  }

  return (
    <div className={styles.container}>
      <Nav />
      <div style={{ textAlign: "center", alignItems: "center" }}>
        <h1>Congratulations! You've just issued an NFT.</h1>
        {/* <div className={styles.return}> */}
        <button className={styles.return} onClick={handleClick}>
          Back to my wallet
        </button>
        {/* </div> */}
      </div>
    </div>
  )
}
