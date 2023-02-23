import Row from '../Row';

export default function GameBoard({state, dispatch}) {


  return (
    <div id="game-board" className="game-board">
      {state.board.map((round, index) => (
        <Row
          key={index}
          id={index}
          // state={state}
          dispatch={dispatch}
          // round={round}
          // roundIndex={getRoundIndex()}
          // roundOver={roundOver}
          // setRoundOver={setRoundOver}
          solution={state.solution}
          // globalIndex={globalIndex}
          // setGlobalIndex={setGlobalIndex}
          // setSameRound={setSameRound}
        />
      ))}
    </div>
  );
};
