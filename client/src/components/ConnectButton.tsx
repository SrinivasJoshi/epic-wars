declare global {
  interface Window {
    ethereum: any;
  }
}
import { ethers, Signer } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";

const ConnectButton = () => {
  const [_, setWalletAddr] = useRecoilState(walletAddrAtom);

  const onConnect = async () => {
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
      let addr = await signer.getAddress();
      setWalletAddr(addr);
    }
  };

  return (
    <button
      onClick={onConnect}
      className="bg-secondary px-2 py-1 text-primary font-bold rounded-md"
    >
      Connect Wallet
    </button>
  );
};

export default ConnectButton;
