import { getAccountPath } from "ethers/lib/utils";
import { useContext } from "react";
import { Context } from "../context/Context.js";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";

export default function NavBar() {
  const { currentAccount, network, checkWallet } = useContext(Context);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link href="/">
          <a>
            <h1 className={styles.title}>onChainCommerce.</h1>
          </a>
        </Link>
      </div>
      <div className={styles.right}>
        {!currentAccount || network !== "0x4" ? (
          <div className={styles.connect}>
            <button className={styles.button} onClick={checkWallet}>
              Connect Wallet
            </button>
            <p className={styles.error}>
              Please connect your Metamask to Rinkeby!
            </p>
          </div>
        ) : (
          <div className={styles.success}>
            {currentAccount.substring(0, 5)}...
            {currentAccount.substring(37, 42)}
          </div>
        )}
      </div>
    </div>
  );
}
