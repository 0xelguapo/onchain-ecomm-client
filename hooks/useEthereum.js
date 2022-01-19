import abi from "../utils/ItemsManager.json";
import { ethers } from "ethers";

export default function useEthereum() {
  const contractAddress = "0xAeB211bDb23f1402Cf55bF6830f872CfbC697fB3";
  const contractABI = abi.abi;

  const getEthereum = async (ethereum) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const iContract = new ethers.Contract(contractAddress, contractABI, signer);
    return iContract;
  };
  return { getEthereum };
}
