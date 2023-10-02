import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";
import { ICardItem } from "../types";
import { getNFTData, getPlayerAttributes, getWinner } from "../utils/gameLogic";
import Navbar from "./Navbar";
import { io } from "socket.io-client";

export default function Room() {
  const [walletAddr, _] = useRecoilState(walletAddrAtom);
  const [winner, setWinner] = useState("");
  const [player1, setPlayer1] = useState<ICardItem>();
  const [player2, setPlayer2] = useState<ICardItem>();
  const [opponentTraitVal, setOpponentTraitVal] = useState(-1);
  const [pickedTrait, setPickedTrait] = useState(-1);
  const [traitEntries, setTraitEntries] = useState<[string, number][]>([]);
  const [traits, setTraits] = useState<Record<string, number>>({
    "Elemental Magic": 0,
    "Lightning Stealth": 0,
    "Elemental Control": 0,
    "Time and Space": 0,
    "Celestial Space": 0,
    "Chaos Energy": 0,
    "Quantum Enigma": 0,
  });

  let isConnected = walletAddr.length > 0;
  const { roomId } = useParams();
  const { state } = useLocation();
  const { nftId1, _player2Object, turnAddress } = state;

  console
    .log
    // `NFT ID: ${nftId1}\n Player 1 Address ${_player1}\n Player 2 Object ${_player2Object}\n Turn Address ${turnAddress}`,
    ();

  // Set attribute values to 0
  useEffect(() => {
    const entries = Object.entries(traits);
    setTraitEntries(entries);
  }, []);

  // Get player attribute values
  useEffect(() => {
    const helperFunc = async () => {
      let array = await getPlayerAttributes(nftId1);
      const data = array.map((element: BigInt) => Number(element));

      const updatedTraits: Record<string, number> = {};
      Object.keys(traits).forEach((key, index) => {
        updatedTraits[key] = data[index];
      });
      setTraits(updatedTraits);
      const entries = Object.entries(updatedTraits);
      setTraitEntries(entries);
    };
    if (isConnected) {
      helperFunc();
    }
  }, [isConnected]);

  // Logic : NFT data from IPFS
  useEffect(() => {
    const helperFunc = async () => {
      let ans = await getNFTData();
      console.log(ans);
      setPlayer1(ans.data[nftId1]);
      setPlayer2(ans.data[_player2Object.nftID]);
    };

    if (isConnected) {
      helperFunc();
    }
  }, [isConnected]);

  // Logic : Submit to calculate winner of duel
  const submitToCalcWinner = async (attributeNumber: Number) => {
    let winnerAddress = await getWinner(
      attributeNumber,
      nftId1,
      _player2Object.nftID,
      _player2Object.socketID,
    );
    let val = await getPlayerAttributes(_player2Object.nftID);
    const data = val.map((element: BigInt) => Number(element));
    setOpponentTraitVal(data[pickedTrait]);
    setWinner(winnerAddress);
  };

  // Logic : listening for traitPicked event
  useEffect(() => {
    if (isConnected) {
      const socket = io("https://epic-wars-server.onrender.com");
      socket.on("share-attribute", ({ attribute }) => {
        setPickedTrait(attribute);
      });
    }
  }, [isConnected]);

  return (
    <div>
      <Navbar />
      <section className="bg-primary min-h-screen flex flex-col items-center justify-evenly">
        <h1 className="text-4xl text-secondary font-bold font-Handjet">
          DUEL TIME - {roomId}
        </h1>
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <img
              src={`https://brown-written-gayal-909.mypinata.cloud/ipfs/QmdQYeMhzD2LocJMErzFvTLA64ikC6Ebz6saWBddZvbq6c/${nftId1}.png`}
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
              src={`https://brown-written-gayal-909.mypinata.cloud/ipfs/QmdQYeMhzD2LocJMErzFvTLA64ikC6Ebz6saWBddZvbq6c/${_player2Object.nftID}.png`}
              alt="Image1"
              className="mb-3 w-64 rounded-sm"
            />
            <h2 className="text-2xl text-secondary font-bold font-Handjet">
              {player2?.name}
            </h2>
          </div>
        </div>

        {winner.length === 0 && (
          <div className="flex flex-col items-center">
              <>
                <h3 className="text-2xl text-white font-Handjet mb-4">
                  {turnAddress === walletAddr ? "It's your turn : Pick one trait for the duel :" : "It's your opponent's turn to play"}
                </h3>

                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-3">
                    {traitEntries.slice(0, 3).map(([trait, value], i) => (
                      <button
                        key={trait}
                        disabled={
                          winner.length > 0 && walletAddr !== turnAddress
                        }
                        className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat disabled:cursor-not-allowed"
                        onClick={() => {
                          setPickedTrait(i);
                          submitToCalcWinner(i);
                        }}
                      >
                        {trait}: {value}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    {traitEntries.slice(3, 7).map(([trait, value], i) => (
                      <button
                        key={trait}
                        disabled={
                          winner.length > 0 && walletAddr !== turnAddress
                        }
                        className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat disabled:cursor-not-allowed"
                        onClick={() => {
                          setPickedTrait(i);
                          submitToCalcWinner(i);
                        }}
                      >
                        {trait}: {value}
                      </button>
                    ))}
                  </div>
                </div>
              </>
          </div>
        )}

        {
          turnAddress!==walletAddr && pickedTrait && 
          <h2>Your opponent Picked Trait : {traitEntries[pickedTrait][0]} </h2>
        }

        {winner.length > 0 && (
          <>
            {winner == walletAddr ? (
              <h1 className="text-4xl text-secondary font-bold font-Handjet">
                You won the Duel
                <br />
                <br />
                Your trait value : {traitEntries[pickedTrait][1]}
                <br />
                Opponent's trait value : {opponentTraitVal}
              </h1>
            ) : (
              <h1 className="text-4xl text-secondary font-bold">
                You lost the Duel, Better luck next time
                <br />
                <br />
                Your trait value : {traitEntries[pickedTrait]?.[1]}
                <br />
                Opponent's trait value : {opponentTraitVal}
              </h1>
            )}
          </>
        )}
      </section>
    </div>
  );
}
