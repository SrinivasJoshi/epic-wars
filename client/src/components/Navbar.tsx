import ConnectButton from "./ConnectButton";
import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";

const Navbar = () => {
  const [walletAddr, _] = useRecoilState(walletAddrAtom);

  return (
    <nav className="w-full flex justify-between items-center p-3 bg-primary fixed">
      <p className="text-lg font-semibold text-white">Logo</p>
      {walletAddr.length === 0 ? (
        <ConnectButton />
      ) : (
        <p className="bg-secondary font-semibold px-2 py-1 rounded-md">
          {walletAddr.substring(0, 5) +
            "..." +
            walletAddr.substring(walletAddr.length - 3)}
        </p>
      )}
    </nav>
  );
};

export default Navbar;
