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
  setKeyColors
}) => {

  const [classes, setClasses] = useState('box');

   // Compare letter in guess with letters in solution to determine gameboard coloring
//  const checkLetter = (letter, index, solution, keyColors) => {
//   const correctLetter = solution.slice(index, index + 1);
//   if (correctLetter === letter) {
//     const keyColorsCopy = { ...keyColors, [letter]: 'correct' };
//     setKeyColors(keyColorsCopy);

//     return 'correct';
//   } else if (solution.split('').indexOf(letter) >= 0) {
//     if (keyColors[letter] === 'unselected') {
//       const keyColorsCopy = { ...keyColors, [letter]: 'close' };
//       setKeyColors(keyColorsCopy);
//     }

//     return 'close';
//   } else {
//     if (solution.split('').indexOf(letter) === -1) {
//       const keyColorsCopy = { ...keyColors, [letter]: 'incorrect' };
//       setKeyColors(keyColorsCopy);
//     }

//     return 'incorrect';
//   }
// };



// const getColorClass = (letter, index, solution, keyColors) => {
//   const correctLetter = solution.slice(index, index + 1);
//   const correctLetterIndex = solution.split('').indexOf(letter);

//   if (correctLetter === letter) {
//     return 'correct';
//   } else if (correctLetterIndex >= 0) {
//     if (keyColors[letter] === 'unselected') {
//       return 'close';
//     }
//   } else {
//     if (correctLetterIndex === -1) {
//       return 'incorrect';
//     }
//   }
// };




// // const keyColorsCopy = { ...keyColors, [letter]: getColorClass() };
// // setKeyColors(keyColorsCopy);



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








  useEffect(() => {
    const checkAnswer = () => {
      const classList = round.map((letter, index) => {


        // const keyColorsCopy = { ...keyColors, [letter]: getColorClass(letter, index, solution, keyColors) };
        // setKeyColors(keyColorsCopy);
        
        // return keyColorsCopy
        // console.log(keyColorsCopy)


      // setKeyColors(getColorClass(letter, index, solution, keyColors));
      return getColorClass(letter, index, solution, keyColors);

        
       });
      return classList;
    };
    if (roundOver && id < roundIndex) {
      console.log(checkAnswer())
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
