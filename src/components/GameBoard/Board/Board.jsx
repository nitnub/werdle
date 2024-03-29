import Row from '../Row';

export default function Board({ state, dispatch }) {
  return (
    <div data-testid="game-board" id="game-board" className="game-board">
      {state.board.map((round, index) => (
        <Row
          
          key={index}
          id={index}
          round={round}
          state={state}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}
