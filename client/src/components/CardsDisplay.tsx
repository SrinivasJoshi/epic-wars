import { useEffect, useState } from "react";
import { ICardItem } from "../types";
import { getNFTData } from "../utils/gameLogic";
import { walletAddrAtom } from "../recoil/atom/walletAddr";
import { useRecoilState } from "recoil";

interface ICardsDisplay {
  nftId1: number;
  nftId2: number;
  roomId: string | undefined;
}

export default function CardsDisplay(props: ICardsDisplay) {
  const { nftId1, nftId2, roomId } = props;
  const [player1, setPlayer1] = useState<ICardItem>();
  const [player2, setPlayer2] = useState<ICardItem>();
  const [walletAddr, _] = useRecoilState(walletAddrAtom);
  let isConnected = walletAddr.length > 0;

  useEffect(() => {
    const helperFunc = async () => {
      let ans = await getNFTData();
      setPlayer1(ans.data[nftId1]);
      setPlayer2(ans.data[nftId2]);
    };

    if (isConnected) {
      helperFunc();
    }
  }, [isConnected]);

  return (
    <>
      <h1 className="text-4xl text-secondary font-bold font-Handjet">
        DUEL TIME - {roomId}
      </h1>
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <img
            src={`https://brown-written-gayal-909.mypinata.cloud/ipfs/QmQFXnA8fFFg9EGcRNPU6ERJHyPdKzpkAkUjUAwBEuE8Nb/${nftId1}.png`}
            alt="Image1"
            className="mb-3 w-64 rounded-sm"
          />
          <h2 className="text-2xl text-secondary font-bold font-Handjet">
            {player1?.name}
          </h2>
        </div>
        <h2 className="text-2xl text-secondary font-bold font-Handjet mx-5">
          VS
        </h2>
        <div className="flex flex-col items-center">
          <img
            src={`https://brown-written-gayal-909.mypinata.cloud/ipfs/QmQFXnA8fFFg9EGcRNPU6ERJHyPdKzpkAkUjUAwBEuE8Nb/${nftId2}.png`}
            alt="Image1"
            className="mb-3 w-64 rounded-sm"
          />
          <h2 className="text-2xl text-secondary font-bold font-Handjet">
            {player2?.name}
          </h2>
        </div>
      </div>
    </>
  );
}
