import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import { Context } from "../../context/Context.js";
import styles from "../../styles/Product.module.css";

const Product = () => {
  const [itemObject, setItemObject] = useState("");
  const router = useRouter();
  const { id, product } = router.query;

  const { itemsArray, ethState } = useContext(Context);

  const newItem = itemsArray.filter((item) => item.identifier === id)[0];
  // const itemIndex = itemsArray.findIndex((item) => item.identifier === id);

  if (!newItem) return <p></p>;
  console.log("newItem", newItem);

  const handlePurchase = async () => {
    try {
      const txHash = await ethState.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: ethState.selectedAddress,
            to: newItem.address,
            value: newItem.price._hex,
            chainId: "0x4",
          },
        ],
      });
      console.log(txHash);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.mainContainer}>
        <div className={styles.image}>
          <Image
            className="productImage"
            src={newItem.imageUrl}
            width={600}
            height={500}
          />
        </div>
        <div className={styles.mainInfo}>
          <h1 className={styles.title}>{id}</h1>
          <p className={styles.address}>
            <a
              href={`https://rinkeby.etherscan.io/address/${newItem.address}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {newItem.address.slice(0, 6)}...{newItem.address.slice(38)}{" "}
              <Image src="/external.svg" width={16} height={16} />
            </a>
          </p>
          <h3 className={styles.description}>{newItem.description}</h3>
          <p className={styles.times}>
            {parseInt(newItem.timesPurchased)} Sales
          </p>
          <p className={styles.price}>
            <Image src="/eth.svg" width={15} height={15} />
            {parseInt(newItem.price)} Wei
          </p>
          <button className={styles.button} onClick={handlePurchase}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
