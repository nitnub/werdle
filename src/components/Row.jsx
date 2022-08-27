import React, { useEffect, useState } from 'react';


const Row = ({
  id,
  round,
  solution,
  roundIndex,
  roundOver,
  setRoundOver,
  // checkLetter,
  keyColors,
  boxHeight,
  setKeyColors
}) => {

  const [classes, setClasses] = useState('box');

   // Compare letter in guess with letters in solution to determine gameboard coloring
 const checkLetter = (letter, index, solution, keyColors) => {
  const correctLetter = solution.slice(index, index + 1);
  if (correctLetter === letter) {
    const keyColorsCopy = { ...keyColors, [letter]: 'correct' };
    setKeyColors(keyColorsCopy);

    return 'correct';
  } else if (solution.split('').indexOf(letter) >= 0) {
    if (keyColors[letter] === 'unselected') {
      const keyColorsCopy = { ...keyColors, [letter]: 'close' };
      setKeyColors(keyColorsCopy);
    }

    return 'close';
  } else {
    if (solution.split('').indexOf(letter) === -1) {
      const keyColorsCopy = { ...keyColors, [letter]: 'incorrect' };
      setKeyColors(keyColorsCopy);
    }

    return 'incorrect';
  }
};


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
