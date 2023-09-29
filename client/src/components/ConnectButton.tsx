declare global {
  interface Window {
    ethereum: any;
  }
}
import { ethers, Signer } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";
import { toast } from "react-toastify";

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
      let chain = (await provider.getNetwork()).chainId.toString();

      if (parseInt(chain) != 23295) {
        toast.error("Change network to Oasis Sapphire Testnet!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

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
