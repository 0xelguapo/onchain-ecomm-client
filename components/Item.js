import { useEffect } from "react";
import useEthereum from "../hooks/useEthereum";
import styles from "../styles/Item.module.css";
import Image from "next/image";
import Link from "next/link";


export default function Item({ imageUrl, identifier, price }) {
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <Image
        layout="responsive"
          className="itemImage"
          src={imageUrl}
          width={350}
          height={450}
          alt="yoga"
        />
      </div>
      <div className={styles.lower}>
        <h3 className={styles.title}>{identifier}</h3>
        <div className={styles.cta}>
          <div className={styles.shop}>Shop</div>
          <div className={styles.price}>
            <Image src="/eth.svg" width={12} height={12} />
            {price}
            <span style={{fontSize: '.8rem'}}> Wei</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
