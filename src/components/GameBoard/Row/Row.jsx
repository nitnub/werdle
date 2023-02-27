import React, { useEffect, useState } from 'react';
import Box from '../Box';
import { action } from '../../../context/game.actions';
import { getRoundIndex } from '../../../context/game.helpers';

export default function Row({ id, state, dispatch, round }) {
  const [thisRoundIsOver, setThisRoundIsOver] = useState(false);

  // Set box sizes
  const rowHeight = () => document.getElementById('box0')?.clientHeight;
  const [boxHeight, setBoxHeight] = useState(rowHeight());

  useEffect(() => {
    const resizeRows = () => {
      setBoxHeight(() => rowHeight());
    };
    resizeRows();
    window.addEventListener('resize', resizeRows);
    return () => window.removeEventListener('resize', resizeRows);
  });

  useEffect(() => {
    if (state.globalIndex === 0) {
      setThisRoundIsOver(false);
    }
  }, [state.globalIndex]);

  useEffect(() => {
    const roundIndex = getRoundIndex(state);
    if (state.roundOver && id < roundIndex) {
      dispatch({ type: action.updateSameRound, payload: true });

      setThisRoundIsOver(() => true);
    }
    dispatch({ type: action.updateRoundOver, payload: false });
  }, [state.roundOver]);

  return (
    <div className="row">
      {round.map((letter, index) => (
        <Box
          key={`b${index}`}
          index={index}
          state={state}
          letter={letter}
          boxHeight={boxHeight}
          thisRoundIsOver={thisRoundIsOver}
          solution={state.solution}
        />
      ))}
    </div>
  );
}
