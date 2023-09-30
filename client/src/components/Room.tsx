import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";
import Navbar from "./Navbar";
import { getContractWithProvider } from "../utils/contractHelper";
import { ICardItem } from "../types";

export default function Room() {
  const [walletAddr, _] = useRecoilState(walletAddrAtom);
  const [attributes, setAttributes] = useState([]);
  const [player1, setPlayer1] = useState<ICardItem>();
  const [player2, setPlayer2] = useState<ICardItem>();

  let isConnected = walletAddr.length >0;
  const { roomId } = useParams();
  // const {state} = useLocation();
  // const {nftId1,nftId2,player1Addr,player2Addr,} = state;


  const getPlayerAttributes = async()=>{
    let contract = await getContractWithProvider();
    let ans = await contract.getAttributes(walletAddr);
    setAttributes(ans);
  }

  const getNFTData = async()=>{
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
  }

  //get player attribute values
  useEffect(() => {
    if(isConnected){
      getPlayerAttributes();
    }
  }, [isConnected]);

  // NFT data from IPFS
  useEffect(() => {
    if(isConnected){
      // getNFTData();
    }
  }, [isConnected])
  

  
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
            <img src={'/images/holder.png'} alt="Image1" className="mb-3 w-64 rounded-sm" />
            <h2 className="text-2xl text-secondary font-bold font-Handjet">KameKazi</h2>
          </div>
          <h2 className="text-2xl text-secondary font-bold font-Handjet mx-5">VS</h2>
          <div className="flex flex-col items-center">
            <img src={'/images/holder.png'} alt="Image1" className="mb-3 w-64 rounded-sm" />
            <h2 className="text-2xl text-secondary font-bold font-Handjet">KameKazi</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
