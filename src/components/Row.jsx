import React, { useEffect, useState } from 'react';




const Row = ({
  id,
  round,
  solution,
  roundIndex,
  roundOver,
  setRoundOver,
  checkLetter,
  keyColors,
  letterIndex,
}) => {

  const rowHeight = () => document.getElementById('row0')?.clientHeight

  const [classes, setClasses] = useState('box');
  const [boxHeight, setBoxHeight] = useState(rowHeight());


  useEffect(() => {
    const resizeRows = () => {
      setBoxHeight((boxHeight) => rowHeight());
    };
    
    window.addEventListener('resize', resizeRows);
    return () => window.removeEventListener('resize', resizeRows);
  }, [boxHeight, letterIndex]);

  useEffect(() => {
    const checkAnswer = () => {
      const classList = round.map((letter, index) =>
        checkLetter(letter, index, solution, keyColors)
      );
      return classList;
    };

    if (roundOver && id < roundIndex) {
      setClasses(checkAnswer());
    }
    setRoundOver(false);
  }, [
    id,
    roundIndex,
    roundOver,
    setRoundOver,
    solution,
    keyColors,
    round,
    checkLetter,
  ]);

  return (
    <div className="row">
      {round.map((letter, index) => (
        <div 
          id={`row${index}`} 
          key={index} 
          className={'box ' + classes[index]}
          // Adjust font size to fit box
          style={{width: rowHeight(), fontSize: `${boxHeight * .75}px`}}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};
export default Row;
