import { io } from "socket.io-client";
import { getContractWithProvider } from "./contractHelper";

export const getWinner = async (
  attributeNumber: Number,
  nftId1: Number,
  nftId2: Number,
) => {
  //send message to server
  const socket = io("https://epic-wars-server.onrender.com");
  socket.emit("traitPicked", {
    socketID: socket.id,
    trait: attributeNumber,
  });

  //send tx to blockchain for calculating winner
  try {
    let contract = await getContractWithProvider();
    let ans = await contract.characterWar(nftId1, nftId2, attributeNumber);
    return ans;
  } catch (error) {
    console.log(error);
  }
};

export const getNFTData = async () => {
  const apiUrl =
    "https://teal-still-rat-339.mypinata.cloud/ipfs/QmdmpaEQpnWNXVUapTmVHPitmaaArJrDJqCZy75f7UZdnZ";
  try {
    const res = await fetch(apiUrl);
    const ans = await res.json();
    return ans;
  } catch (error) {
    console.log(error);
  }
};

export const getPlayerAttributes = async () => {
  try {
    let contract = await getContractWithProvider();

    let data = await contract.getAttributes();
    return data;
    //   const updatedTraits: Record<string, number> = {};
    //   Object.keys(traits).forEach((key, index) => {
    //     updatedTraits[key] = data[index];
    //   });
    //   setTraits(updatedTraits);
    //   const entries = Object.entries(updatedTraits);
    //   setTraitEntries(entries);
  } catch (error) {
    console.log(error);
  }
};
