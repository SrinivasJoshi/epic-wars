import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";
import { getContractWithProvider } from "../utils/contractHelper";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../utils/socketHelper";

export default function Lobby() {
  const [walletAddr, _] = useRecoilState<string>(walletAddrAtom);
  const [nftId, setNftId] = useState(0);
  const isConnected = walletAddr.length > 0;
  const navigate = useNavigate();

  const getPlayerInfo = async () => {
    let contract = await getContractWithProvider();
    let ans = await contract.getIDFromAddress(walletAddr);
    let _nftId = parseInt(ans.toString());
    setNftId(_nftId);
  };

  useEffect(() => {
    if (isConnected) {
      getPlayerInfo();
    }
  }, [isConnected]);

  useEffect(() => {
    if (nftId > 0) {
      // connect to socket
      const socket = connectSocket();

      socket.on("connect", () => {
        console.log(`Connected to server with socket id -> ${socket.id}`);
        socket.emit("add-queue", {
          socketID: socket.id,
          address: walletAddr,
          nftID: nftId.toString(),
        });
      });

      socket.on("match", (res) => {
        const { roomIdentifier, opponent, turnAddress } = res;
        navigate(`/room/${roomIdentifier}`, {
          replace: true,
          state: {
            nftId1: nftId,
            _player1: walletAddr,
            _player2Object: opponent,
            turnAddress,
          },
        });
      });
    }
  }, [nftId]);

  return (
    <div>
      <Navbar />
      {isConnected ? (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-evenly">
          <h1 className="text-4xl text-secondary font-bold font-Handjet">
            Lobby - waiting for other player to join!
          </h1>
          {nftId === 0 ? (
            <p className="text-2xl text-myred font-Handjet text-center">
              Looks like you don't own any NFT. <br /> Click the logo and claim
              one
              <br />
              OR
              <br />
              Wait till blockchain state updates
            </p>
          ) : (
            <img
              src="/images/loading.gif"
              alt="Loading GIF"
              width={300}
              height={200}
            />
          )}
        </section>
      ) : (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-evenly">
          <h1 className="text-4xl text-secondary font-bold font-Handjet mb-10">
            Connect wallet to play!
          </h1>
        </section>
      )}
    </div>
  );
}
