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
  }, [id, roundIndex, roundOver, setRoundOver]);

  return (
    <div className="row">
      {round.map((letter, index) => (
        <div key={index} className={'box ' + classes[index]}>
          {letter}
        </div>
      ))}
    </div>
  );
}
export default Row;