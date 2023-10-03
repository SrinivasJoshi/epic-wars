// import { Link } from 'react-router-dom';
interface IResultDisplay {
  winner: string;
  walletAddr: string;
  traitValue: number;
  opponentTraitValue: number;
  traitNames : { [key: number]: string } 
  pickedTrait:number
}

export default function ResultDisplay(props: IResultDisplay) {
  const { winner, walletAddr, traitValue, opponentTraitValue,traitNames,pickedTrait } = props;
  return (
    <>
      {winner.length > 0 && (
        <>
          {winner == walletAddr ? (
            <div className="flex flex-col text-secondary items-center justify-evenly">
            <h1 className="text-4xl text-center font-bold font-Handjet">
              You won the Duel
            </h1>
            <p className="text-2xl text-center font-bold font-Handjet">
              Your {traitNames[pickedTrait]} value : {traitValue}
             </p> 

           <p className="text-2xl text-center font-bold font-Handjet">
           Opponent's {traitNames[pickedTrait]} value : {opponentTraitValue}
           </p>
           </div>) : 
           (
            <div className="flex flex-col items-center justify-evenly text-myred">
              <h1 className="text-4xl font-bold font-Handjet">
              You lost the Duel, Better luck next time
            </h1>
            <p className="text-3xl text-center font-bold font-Handjet">
              Your {traitNames[pickedTrait]} value : {traitValue}
             </p> 

           <p className="text-3xl text-center font-bold font-Handjet">
           Opponent's {traitNames[pickedTrait]} value : {opponentTraitValue}
           </p>
            </div>
          )}

          <button
                className="bg-secondary px-2 py-1 text-primary font-bold rounded-md"

          >
          <a href='https://epic-wars.vercel.app/lobby'>Go Back</a>
          {/* <Link to={'/lobby'}>Go Back</Link> */}
          </button>
        </>
      )}
    </>
  );
}
