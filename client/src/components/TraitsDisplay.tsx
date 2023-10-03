import { useEffect } from "react";
import { getPlayerAttributes } from "../utils/gameLogic";

interface ITraitsDisplay {
  nftId1: number;
  winner: string;
  walletAddr: string;
  turnAddress: string;
  traitValues:number[],
  setTraitValues:React.Dispatch<React.SetStateAction<number[]>>
  setPickedTrait: React.Dispatch<React.SetStateAction<number>>;
  submitToCalcWinner: (attributeNumber: number, isSendToServer: Boolean) => Promise<void>
}

export default function TraitsDisplay(props: ITraitsDisplay) {
  const {
    nftId1,
    winner,
    walletAddr,
    turnAddress,
    setPickedTrait,
    submitToCalcWinner,
    traitValues,
    setTraitValues
  } = props;

  let isConnected = walletAddr.length > 0;

  useEffect(() => {
    const helperFunc = async () => {
      let array = await getPlayerAttributes(nftId1);
      const data: number[] = array.map((element: BigInt) => Number(element));
      setTraitValues(data);
    };
    if (isConnected) {
      helperFunc();
    }
  }, [isConnected]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center mb-3">
        <button
          disabled={winner.length > 0 || walletAddr !== turnAddress}
          className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat disabled:cursor-not-allowed"
          onClick={() => {
            setPickedTrait(0);
            submitToCalcWinner(0,true);
          }}
        >
          Elemental Magic : {traitValues[0]}
        </button>
        <button
          disabled={winner.length > 0 || walletAddr !== turnAddress}
          className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat disabled:cursor-not-allowed"
          onClick={() => {
            setPickedTrait(1);
            submitToCalcWinner(1,true);
          }}
        >
          Lightning Stealth : {traitValues[1]}
        </button>
        <button
          disabled={winner.length > 0 || walletAddr !== turnAddress}
          className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat disabled:cursor-not-allowed"
          onClick={() => {
            setPickedTrait(2);
            submitToCalcWinner(2,true);
          }}
        >
          Elemental Control : {traitValues[2]}
        </button>
      </div>
      <div className="flex justify-center">
        <button
          disabled={winner.length > 0 || walletAddr !== turnAddress}
          className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat disabled:cursor-not-allowed"
          onClick={() => {
            setPickedTrait(3);
            submitToCalcWinner(3,true);
          }}
        >
          Time and Space : {traitValues[3]}
        </button>

        <button
          disabled={winner.length > 0 || walletAddr !== turnAddress}
          className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat disabled:cursor-not-allowed"
          onClick={() => {
            setPickedTrait(4);
            submitToCalcWinner(4,true);
          }}
        >
          Celestial Space : {traitValues[4]}
        </button>

        <button
          disabled={winner.length > 0 || walletAddr !== turnAddress}
          className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat disabled:cursor-not-allowed"
          onClick={() => {
            setPickedTrait(5);
            submitToCalcWinner(5,true);
          }}
        >
          Chaos Energy : {traitValues[5]}
        </button>

        <button
          disabled={winner.length > 0 || walletAddr !== turnAddress}
          className="bg-secondary text-primary rounded-md px-4 py-2 mx-2 font-bold font-Montserrat disabled:cursor-not-allowed"
          onClick={() => {
            setPickedTrait(6);
            submitToCalcWinner(6,true);
          }}
        >
          Quantum Enigma : {traitValues[6]}
        </button>
      </div>
    </div>
  );
}
