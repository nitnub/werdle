// last updated 11/15/22

import React, { useEffect, useState } from 'react';

import Box from './Box';
const Row = ({
  id,
  round,
  solution,
  roundIndex,
  roundOver,
  setRoundOver,
  globalIndex,
  setSameRound,
  setNewRound,
}) => {
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

    if (globalIndex === 0) {
      setThisRoundIsOver(false);
    }
  }, [globalIndex]);

  useEffect(() => {

    // Only check the most recent round and those that came before it
    if (roundOver && id < roundIndex) {

      setSameRound(() => true);
      // setNewRound(() => true);
      setThisRoundIsOver(() => true);
    }
    setRoundOver(false);
  }, [roundOver, id, roundIndex, setRoundOver, setSameRound]);

  return (
    <div className="row">
      {round.map((letter, index) => (
        <Box
          key={`b${index}`}
          index={index}
          letter={letter}
          // classes={classes}
          boxHeight={boxHeight}
          // roundOver={roundOver}
          thisRoundIsOver={thisRoundIsOver}
          solution={solution}
        />
      ))}
    </div>
  );
};
export default Row;
