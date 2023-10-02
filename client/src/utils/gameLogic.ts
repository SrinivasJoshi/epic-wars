import { io } from "socket.io-client";
import { getContractWithProvider } from "./contractHelper";

export const getWinner = async (
  attributeNumber: Number,
  nftId1: Number,
  nftId2: Number,
  socketIDopponent: string,
) => {
  //send message to server
  const socket = io("https://epic-wars-server.onrender.com");
  socket.emit("share-attribute", {
    socketIDopponent,
    attribute: attributeNumber,
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

export const getPlayerAttributes = async (nftID: Number) => {
  try {
    let contract = await getContractWithProvider();
    let data = await contract.getCharacterFromID(nftID);
    return data;
  } catch (error) {
    console.log(error);
  }
};
