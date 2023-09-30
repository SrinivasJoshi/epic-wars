import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";
import Navbar from "./Navbar";
import { getContractWithProvider } from "../utils/contractHelper";
import { ICardItem } from "../types";

export default function Room() {
  const [walletAddr, _] = useRecoilState(walletAddrAtom);
  // const [attributes, setAttributes] = useState([]);
  const [player1, setPlayer1] = useState<ICardItem>();
  const [player2, setPlayer2] = useState<ICardItem>();

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
  // const {state} = useLocation();
  // const {nftId1,nftId2,player1Addr,player2Addr} = state;

  //get player attribute values
  useEffect(() => {
    // const getPlayerAttributes = async()=>{
    //   let contract = await getContractWithProvider();
    //   let ans = await contract.getAttributes();
    //   setAttributes(ans);
    // }

    const getPlayerAttributes = async () => {
      try {
        let contract = await getContractWithProvider();

        let data = await contract.getAttributes();
        const updatedTraits: Record<string, number> = {};
        Object.keys(traits).forEach((key, index) => {
          updatedTraits[key] = data[index];
        });
        setTraits(updatedTraits);
        const entries = Object.entries(updatedTraits);
        setTraitEntries(entries);
      } catch (error) {
        console.log(error);
      }
    };

    if (isConnected) {
      getPlayerAttributes();
    }
  }, [isConnected]);

  useEffect(() => {
    const entries = Object.entries(traits);
    setTraitEntries(entries);
  }, [])
  

  // NFT data from IPFS
  useEffect(() => {
    const getNFTData = async () => {
      const apiUrl =
        "https://teal-still-rat-339.mypinata.cloud/ipfs/QmdmpaEQpnWNXVUapTmVHPitmaaArJrDJqCZy75f7UZdnZ";
      try {
        const res = await fetch(apiUrl);
        const ans = await res.json();
        // setPlayer1(ans[nftId1]);
        // setPlayer2(ans[nftId2]);
      } catch (error) {
        console.log(error);
      }
    };

    if (isConnected) {
      // getNFTData();
    }
  }, [isConnected]);

  const submitAttribute = async()=>{
    //send message to server
    //send tx to contract for winner
    try {
      let contract = await getContractWithProvider();

    } catch (error) {
      
    }
  }

  return (
    <div>
      <Navbar />
      <section className="bg-primary min-h-screen flex flex-col items-center justify-evenly">
        <h1 className="text-4xl text-secondary font-bold font-Handjet">
          DUEL TIME - {roomId}
        </h1>
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            {/* TODO:Add placeholders below  */}
            <img
              src={"/images/holder.png"}
              alt="Image1"
              className="mb-3 w-64 rounded-sm"
            />
            <h2 className="text-2xl text-secondary font-bold font-Handjet">
              KameKazi
            </h2>
          </div>
          <h2 className="text-2xl text-secondary font-bold font-Handjet mx-5">
            VS
          </h2>
          <div className="flex flex-col items-center">
            <img
              src={"/images/holder.png"}
              alt="Image1"
              className="mb-3 w-64 rounded-sm"
            />
            <h2 className="text-2xl text-secondary font-bold font-Handjet">
              KameKazi
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-2xl text-white font-Handjet mb-4">
            Pick one trait for the duel :{" "}
          </h3>

          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-3">
              {traitEntries.slice(0, 3).map(([trait, value]) => (
                <button
                  key={trait}
                  className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat"
                  onClick={submitAttribute}
                >
                  {trait}: {value}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              {traitEntries.slice(3, 7).map(([trait, value]) => (
                <button
                  key={trait}
                  className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat"
                  onClick={submitAttribute}
                >
                  {trait}: {value}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold font-Handjet text-white">It's your opponent's turn to play</h3>
        </div>
      </section>
    </div>
  );
}
