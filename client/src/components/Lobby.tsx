import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";

export default function Lobby() {
  const [walletAddr, _] = useRecoilState<string>(walletAddrAtom);
  let isConnected = walletAddr.length > 0;

  return (
    <div className="mt-14">
      {isConnected ? (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-evenly">
          <h1 className="text-4xl text-secondary font-bold font-Handjet">
            Lobby - waiting for other player to join!
          </h1>
          <img
            src="/images/loading.gif"
            alt="Loading GIF"
            width={300}
            height={200}
          />
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
