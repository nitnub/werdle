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
  boxHeight,
}) => {

  const [classes, setClasses] = useState('box');

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
  });

  return (
    <div className="row">
      {round.map((letter, index) => (
        <div 
          id={`row${index}`} 
          key={index} 
          className={'box ' + classes[index]}
          style={{width: boxHeight, fontSize: `${boxHeight * .75}px`}} // Adjust font size to fit box
        >
          {letter}
        </div>
      ))}
    </div>
  );
};
export default Row;
