import NavBar from "../../components/NavBar";
import styles from "../../styles/Orders.module.css";
import Head from "next/head";

export default function MyOrders() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Orders | On-Chain Commerce</title>
        <meta
          name="description"
          content="My Orders | On-Chain Commerce"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
    </div>
  );
}
