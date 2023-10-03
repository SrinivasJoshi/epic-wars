import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";
import { getPlayerAttributes, getWinner } from "../utils/gameLogic";
import { connectSocket } from "../utils/socketHelper";
import CardsDisplay from "./CardsDisplay";
import Navbar from "./Navbar";
import ResultDisplay from "./ResultDisplay";
import TraitsDisplay from "./TraitsDisplay";
import Loader from "./Loader";

export default function Room() {
  const [walletAddr, _] = useRecoilState(walletAddrAtom);
  const [winner, setWinner] = useState("");
  const [loading, setLoading] = useState(false);
  const [opponentTraitVal, setOpponentTraitVal] = useState<number>(0);
  const [pickedTrait, setPickedTrait] = useState<number>(-1);
  const [traitValues, setTraitValues] = useState<number[]>([]);
  const traitNames:{ [key: number]: string }  = {
    0: "Elemental Magic",
    1: "Lightning Stealth",
    2: "Elemental Control",
    3: "Time and Space",
    4: "Celestial Space",
    5: "Chaos Energy",
    6: "Quantum Enigma"
  };

  let isConnected = walletAddr.length > 0;
  const { roomId } = useParams();
  const { state } = useLocation();
  const { nftId1, _player2Object, turnAddress } = state;

  // Logic : Submit to calculate winner of duel
  const submitToCalcWinner = async (attributeNumber: number,isSendToServer:Boolean) => {
    setLoading(true);
    let winnerAddress = await getWinner(
      attributeNumber,
      nftId1,
      _player2Object.nftID,
      _player2Object.socketID,
      isSendToServer
    );

    try {
      let val = await getPlayerAttributes(_player2Object.nftID);
      const data:number[] = val.map((element: BigInt) => Number(element));
      setOpponentTraitVal(data[attributeNumber]);
      setWinner(winnerAddress);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };



  // Logic : listening for traitPicked event
  useEffect(() => {
    if (isConnected) {
      const socket = connectSocket();
      socket.on("got-attribute", (attribute) => {
        setPickedTrait(attribute);
        submitToCalcWinner(attribute,false);
      });
    }
  }, [isConnected]);

  return (
    <div>
      <Navbar />
      <section className="bg-primary min-h-screen flex flex-col items-center justify-evenly">
        <CardsDisplay
          nftId1={nftId1}
          nftId2={_player2Object.nftID}
          roomId={roomId}
        />

        {winner.length === 0 && (
          <div className="flex flex-col items-center">
            <>
              <h3 className="text-2xl text-white font-Handjet mb-4">
                {turnAddress === walletAddr
                  ? "It's your turn : Pick one trait for the duel :"
                  : "It's your opponent's turn to play"}
              </h3>
              <TraitsDisplay
                nftId1={nftId1}
                winner={winner}
                walletAddr={walletAddr}
                turnAddress={turnAddress}
                setPickedTrait={setPickedTrait}
                submitToCalcWinner={submitToCalcWinner}
                traitValues={traitValues}
                setTraitValues={setTraitValues}
              />
            </>
          </div>
        )}

        {turnAddress !== walletAddr && pickedTrait > -1 && (
          <h2 className="text-2xl text-white font-Josefin">
            Your opponent Picked Trait : {traitNames[pickedTrait]}
          </h2>
        )}

        <ResultDisplay
          winner={winner}
          walletAddr={walletAddr}
          traitValue={traitValues[pickedTrait]}
          opponentTraitValue={opponentTraitVal}
        />
        {loading && <Loader />}
      </section>
    </div>
  );
}
