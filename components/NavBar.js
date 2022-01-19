import { getAccountPath } from "ethers/lib/utils";
import { useContext } from "react";
import { Context } from "../context/Context.js";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const { currentAccount, network, checkWallet, ordersArray } =
    useContext(Context);
  const length = ordersArray.length;

  return (
    <nav className={styles.container}>
      <div className={styles.left}>
        <Link href="/">
          <a>
            <div className={styles.logo}>
              <Image
                className="logo"
                src="/blockchain.png"
                width={50}
                height={50}
              />
            </div>
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
            <div className={styles.orders}>
              <Link href="/user/my-orders">
                <a>My Orders</a>
              </Link>
              <div className={styles.length}>{length}</div>
            </div>
            <div className={styles.account}>
              {currentAccount.substring(0, 5)}...
              {currentAccount.substring(37, 42)}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
