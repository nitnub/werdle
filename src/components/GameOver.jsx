const GameOver = ({ outcome, setOutcome, solution }) => {
  return (
    <div className="game-over-container">
      <div className="button-container">
        <button className="btn game-over" onClick={() => setOutcome(0)}>X</button>
      </div>
      {outcome === 1 ? <div>{'You won!'}</div> : <div>{'Almost!'}</div>}
      <div>
        {'The word was'} <i>{solution.toLowerCase()}</i>
      </div>
    </div>
  );
};

export default GameOver;
