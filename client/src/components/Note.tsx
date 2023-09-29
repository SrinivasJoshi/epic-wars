// import React from "react";
import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";

export default function Note() {
  const [walletAddr, _] = useRecoilState(walletAddrAtom);
  let isConnected = walletAddr.length > 0;

  return (
    <>
      {isConnected ? (
        <> </>
      ) : (
        <p className="text-myred text-xl font-bold font-Josefin my-10">
          Note : Connect to wallet to get the NFT
        </p>
      )}
    </>
  );
}
