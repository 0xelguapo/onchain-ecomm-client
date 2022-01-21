import { useContext } from "react";
import { Context } from "../context/Context";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import Item from "../components/Item";

export default function Home() {
  const { itemsArray } = useContext(Context);
  return (
    <div className={styles.container}>
      <Head>
        <title>On Chain E-Commerce</title>
        <meta
          name="description"
          content="On chain e-commerce built with NextJS and Solidity"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={styles.mainHero}>
        <div className={styles.left}>
          <h1 className={styles.title}>E-Commerce Concept</h1>
          <p className={styles.description}>
            Web3 is here. Purchase your favorite merchandise using crypto,
            straight from your metamask.
          </p>
          <div className={styles.cta}>
            <button className={styles.button}>Shop Now</button>
          </div>
        </div>
        <div className={styles.right}>
          <Image
            className="modelImage"
            src="/model.svg"
            width={600}
            height={600}
          />
        </div>
      </div>
      <div className={styles.featured}>
        <h1 className={styles.featuredTitle}>Featured Collection</h1>
        <div className={styles.featuredItems}>
          {itemsArray.slice(0, 3).map((item) => (
            <div key={parseInt(item.id)} className={styles.itemContainer}>
              <Link href={"/product/" + item.identifier}>
                <a>
                  <Item
                    id={item.identifier}
                    imageUrl={item.imageUrl}
                    identifier={item.identifier}
                    description={item.description}
                    price={parseInt(item.price)}
                  />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.concept}>
        <h1 className={styles.conceptTitle}>How This Concept Store Works</h1>
        <div className={styles.conceptBackground}>
          <div className={styles.conceptBox}>
            <Image src="/chain.svg" width={50} height={50} />
            <h3 className={styles.boxTitle}>Fully On Chain</h3>
            <p className={styles.boxDescription}>
              All items, purchases, and interactions are directly on the Rinkeby
              network.
            </p>
          </div>
          <div className={styles.conceptBox}>
            <Image src="/contract.svg" width={50} height={50} />
            <h3 className={styles.boxTitle}>Individual Contracts</h3>
            <p className={styles.boxDescription}>
              Each item is its own contract, allowing users to easily send ether
              directly to the contract.
            </p>
          </div>
          <div className={styles.conceptBox}>
            <Image src="/eth.svg" width={50} height={50} />
            <h3 className={styles.boxTitle}>Purchase with Crypto</h3>
            <p className={styles.boxDescription}>
              Pay directly with your metamask, no external account or $fiat
              needed.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.oneFeature}>
        {itemsArray.slice(3, 4).map((item) => (
          <div className={styles.oneFeatureContainer} key={item.id}>
            <div className={styles.oneFeatureLeft}>
              <h1 className={styles.oneFeatureTitle}>{item.identifier}</h1>
              <p className={styles.oneFeatureDescription}>{item.description}</p>
              <p className={styles.price}>
                <Image src="/eth.svg" width={15} height={15} />
                {parseInt(item.price)} <span className={styles.wei}>Wei</span>
              </p>
              <button className={styles.button}>Purchase</button>
            </div>
            <div className={styles.oneFeatureRight}>
              <Image
                className="itemImage"
                src={item.imageUrl}
                width={450}
                height={450}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.ending}>
        <div className={styles.endingOutline}></div>
        <h3 className={styles.endingTitle}>Where On-Chain Meets Style.</h3>
      </div>
    </div>
  );
}
