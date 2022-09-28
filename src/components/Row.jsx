import React, { useEffect, useState } from 'react';

const Row = ({
  id,
  round,
  solution,
  roundIndex,
  roundOver,
  setRoundOver,
  keyColors,
  boxHeight,
  setKeyColors,
}) => {
  const [classes, setClasses] = useState('box');

  const getColorClass = (letter, index, solution, keyColors) => {
    const correctLetter = solution.slice(index, index + 1);
    const correctLetterIndex = solution.split('').indexOf(letter);

    if (correctLetter === letter) {
      return 'correct';
    } else if (correctLetterIndex >= 0) {
      return 'close';
    } else {
      return 'incorrect';
    }
  };

  // TODO: use getColorClass to create new function that updates keyboard color from the box? Needs to only overwrite existing color on "better" guesses

  useEffect(() => {
    const checkAnswer = () => {
      const classList = round.map((letter, index) => {
        return getColorClass(letter, index, solution, keyColors);
      });
      return classList;
    };
    if (roundOver && id < roundIndex) {
      console.log(checkAnswer());
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
          style={{ width: boxHeight, fontSize: `${boxHeight * 0.6}px` }} // Adjust font size to fit box
        >
          {letter}
        </div>
      ))}
    </div>
  );
};
export default Row;
