import ConnectButton from "./ConnectButton";
import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";

const Navbar = () => {
  const [walletAddr, _] = useRecoilState(walletAddrAtom);

  return (
    <nav className="w-full flex justify-between items-center p-4 bg-primary fixed">
      <a href="/">
        <img src="/images/logo.png" alt="Logo" className="w-24" />
      </a>
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
