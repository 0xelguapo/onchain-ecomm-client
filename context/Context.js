import { createContext, useEffect, useState } from "react";
import useEthereum from "../hooks/useEthereum";
import { ethers } from "ethers";

const Context = createContext();

function ContextProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState();
  const [network, setNetwork] = useState();
  const [itemsArray, setItemsArray] = useState([]);
  const [ordersArray, setOrdersArray] = useState([]);
  const [ethState, setEthState] = useState();
  const { getEthereum } = useEthereum();

  function handleChainChanged() {
    window.location.reload();
  }

  const fetchOrders = async (ethereum) => {
    try {
      const iContract = await getEthereum(ethereum);
      const myOrders = await iContract.getAllOrders(ethereum.selectedAddress);
      console.log("myOrders", myOrders);
      setOrdersArray(myOrders);
      console.log("fetchedOrders");
    } catch (err) {
      console.log("orderFetchError", err);
    }
  };

  const checkEthereum = () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please download metamask!");
        return;
      } else {
        return ethereum;
      }
    } catch (err) {
      console.log("error with ethereum", err);
    }
  };

  const checkPurchase = async (ethereum) => {
    try {
      const iContract = await getEthereum(ethereum);
      await iContract.on("itemEvent", (index, step, address, description) => {
        console.log("itemEvent", index, step, address, description);
        getItems(ethereum);
        fetchOrders(ethereum);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getItems = async (ethereum) => {
    try {
      const iContract = await getEthereum(ethereum);
      const items = await iContract.getAllItems();
      let itemsCleaned = [];
      items.forEach((item) => {
        itemsCleaned.push({
          id: item.id,
          address: item._item,
          timesPurchased: item.timesPurchased,
          price: item.priceInWei,
          identifier: item.identifier,
          description: item.description,
          imageUrl: item.imageUrl,
        });
      });
      setItemsArray(itemsCleaned);
      console.log("itemsCleaned", itemsCleaned);
    } catch (err) {
      console.log("getItems error", err);
    }
  };

  const checkWallet = async (ethereum) => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await ethereum.request({ method: "eth_chainId" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        setNetwork(chainId);
        await getItems(ethereum);
        await fetchOrders(ethereum);
      } else {
        console.log("No account found");
      }
    } catch (err) {
      console.log("checkwallet error", err);
    }
  };

  useEffect(() => {
    const ethereum = checkEthereum();
    if (ethereum) {
      checkWallet(ethereum);
      setEthState(ethereum);
      checkPurchase(ethereum);
      ethereum.on("chainChanged", handleChainChanged);
    }
    if (!ethereum) {
      return;
    }

    return () => {
      if (network === "0x4") {
        ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [currentAccount]);

  return (
    <Context.Provider
      value={{
        currentAccount,
        checkEthereum,
        network,
        checkWallet,
        itemsArray,
        ethState,
        ordersArray,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
