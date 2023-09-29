import { Contract, Signer, ethers } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { contractABI, contractAddress } from "./contractInfo";

export const getProvider = async ()=>{
    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider(
        "https://testnet.sapphire.oasis.dev",
      );
    } else {
      provider = sapphire.wrap(new ethers.BrowserProvider(window.ethereum));
    }
    return provider;
}

export const getSigner = async ()=>{
    let signer: Signer | null = null;
    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider(
        "https://testnet.sapphire.oasis.dev",
      );
    } else {
      provider = sapphire.wrap(new ethers.BrowserProvider(window.ethereum));
      signer = await provider.getSigner();
    }
    return signer;
}

export const getContractWithProvider = async ()=>{
    const provider = await getProvider();
    let contract = new Contract(contractAddress,contractABI,provider);
    return contract
}

export const getContractWithSigner = async ()=>{
    const signer = await getSigner();
    let contract = new Contract(contractAddress,contractABI,signer);
    return contract
}