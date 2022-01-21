import { useContext } from "react";
import { Context } from "../../context/Context";
import NavBar from "../../components/NavBar";
import styles from "../../styles/Orders.module.css";
import Head from "next/head";
import Image from "next/image";

export default function MyOrders() {
  const { ordersArray } = useContext(Context);
  return (
    <div className={styles.container}>
      <Head>
        <title>My Orders | On-Chain Commerce</title>
        <meta name="description" content="My Orders | On-Chain Commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={styles.mainContainer}>
        {ordersArray.map((order) => {
          return (
            <div className={styles.orderContainer} key={parseInt(order.id)}>
              <div className={styles.imageContainer}>
                <Image
                  className="itemImage"
                  layout="responsive"
                  src={order.imageUrl}
                  width={150}
                  height={150}
                />
              </div>
              <div className={styles.orderInfo}>
                <div className={styles.top}>
                  <h3 className={styles.title}>{order.identifier}</h3>
                  <p className={styles.address}>
                    <a
                      href={`https://rinkeby.etherscan.io/address/${order._item}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {order._item.slice(0, 6)}...{order._item.slice(38)}{" "}
                      <Image src="/externalgray.svg" width={16} height={16} />
                    </a>
                  </p>{" "}
                  <p className={styles.description}>{order.description}</p>
                </div>
                <div className={styles.bottom}>
                  <p className={styles.price}>
                    Price: {parseInt(order.priceInWei)} Wei
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
