import abi from "../utils/ItemsManager.json";
import { ethers } from "ethers";

export default function useEthereum() {
  const contractAddress = "0xb35A395b98cd85767D96640d983b758A5150321C";
  const contractABI = abi.abi;

  const getEthereum = async (ethereum) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const iContract = new ethers.Contract(contractAddress, contractABI, signer);
    return iContract;
  };
  return { getEthereum };
}
