interface IResultDisplay {
  winner: string;
  walletAddr: string;
  traitValue: number;
  opponentTraitValue: number;
}

export default function ResultDisplay(props: IResultDisplay) {
  const { winner, walletAddr, traitValue, opponentTraitValue } = props;
  console.log(props);
  return (
    <>
      {winner.length > 0 && (
        <>
          {winner == walletAddr ? (
            <h1 className="text-4xl text-secondary font-bold font-Handjet">
              You won the Duel
              <br />
              <br />
              Your trait value : {traitValue}
              <br />
              Opponent's trait value : {opponentTraitValue}
            </h1>
          ) : (
            <h1 className="text-4xl text-secondary font-bold">
              You lost the Duel, Better luck next time
              <br />
              <br />
              Your trait value : {traitValue}
              <br />
              Opponent's trait value : {opponentTraitValue}
            </h1>
          )}
        </>
      )}
    </>
  );
}
