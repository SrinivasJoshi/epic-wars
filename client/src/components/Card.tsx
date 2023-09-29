import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";
import { ICard } from "../types";
import { getContractWithSigner } from "../utils/contractHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Card(props: ICard) {
  const { item, index, isSold, isLoading, setIsLoading } = props;
  const [walletAddr, _] = useRecoilState<string>(walletAddrAtom);
  let isConnected = walletAddr.length > 0;
  const navigate = useNavigate();

  const getNft = async () => {
    setIsLoading(true);
    try {
      let contract = await getContractWithSigner();
      let tx = await contract.mintCharacter(index);
      await tx.wait();
      navigate("/lobby", { replace: true });
    } catch (error) {
      console.log({ error });

      toast.error("Error occured while minting!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 p-4 text-center rounded-lg">
      <img
        src={`https://brown-written-gayal-909.mypinata.cloud/ipfs/QmdQYeMhzD2LocJMErzFvTLA64ikC6Ebz6saWBddZvbq6c/${index}.png`}
        alt="Image"
        className="w-72 h-72 mx-auto mb-4"
      />
      <div className="flex justify-between items-center">
        <p className="text-secondary font-bold">{item.name}</p>
        {isConnected ? (
          isSold ? (
            <button className="bg-myred text-primary px-2 py-1 rounded-sm text-xl font-bold font-Handjet cursor-default">
              Sold Out
            </button>
          ) : (
            <button
              onClick={getNft}
              disabled={!!isLoading}
              className="bg-secondary text-primary px-2 py-1 rounded-sm text-xl font-bold font-Handjet disabled:cursor-not-allowed"
            >
              Get NFT
            </button>
          )
        ) : (
          <p className="text-white font-bold">---</p>
        )}
      </div>
    </div>
  );
}
