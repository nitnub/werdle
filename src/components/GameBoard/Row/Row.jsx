import React, { useEffect, useState } from 'react';
import Box from '../Box';
import { action } from '../../../context/gameStateReducer';

export default function Row({
  id,
  state,
  dispatch,
  round,
  // solution,
  // roundIndex,
  // roundOver,
  // setRoundOver,
  // globalIndex,
  // setSameRound,
  // setNewRound,
}) {
  // Set box sizes
  const rowHeight = () => document.getElementById('box0')?.clientHeight;
  // const boardHeight = () => document.getElementById('game-board')?.clientHeight;
  const [boxHeight, setBoxHeight] = useState(rowHeight());

  useEffect(() => {
    const resizeRows = () => {
      setBoxHeight(() => rowHeight());
    };
    resizeRows();
    window.addEventListener('resize', resizeRows);
    return () => window.removeEventListener('resize', resizeRows);
  });

  const [thisRoundIsOver, setThisRoundIsOver] = useState(false);

  useEffect(() => {
    if (state.globalIndex === 0) {
      setThisRoundIsOver(false);
    }
  }, [state.globalIndex]);

  useEffect(() => {
    // Only check the most recent round and those that came before it
    // console.log('thisround is over', state.roundOver);
    // console.log('thisround is over', id);
    // console.log('thisround is over', state.roundIndex);
    const roundIndex = Math.floor(state.globalIndex / state.wordLength);
    if (state.roundOver && id < roundIndex) {
      // setSameRound(() => true);
      dispatch({ type: action.updateSameRound, payload: true });
      // setNewRound(() => true);
      setThisRoundIsOver(() => true);
    }
    // setRoundOver(false);
    dispatch({ type: action.updateRoundOver, payload: false });
    // }, [state.roundOver, id, state.roundIndex]);
    // }, [dispatch, id, state.roundIndex,  state.roundOver]);
  }, [state.roundOver]);
  return (
    <div className="row">
      {round.map((letter, index) => (
        <Box
          key={`b${index}`}
          index={index}
          state={state}
          // dispatch={dispatch}
          letter={letter}
          // classes={classes}
          boxHeight={boxHeight}
          // roundOver={roundOver}
          thisRoundIsOver={thisRoundIsOver}
          solution={state.solution}
        />
      ))}
    </div>
  );
}
