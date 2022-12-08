import Nav from "../components/Nav"
import CSVFileInput from "../components/CSVFileInput"
import TokenMetadata from "../components/TokenMetadata"
import styles from "../styles/Home.module.css"

export default function Claim() {
  return (
    <div className={styles.container}>
      <Nav />
      <TokenMetadata />
    </div>
  )
}
