// export const keyEvent = (letter) => {
//   console.log('letter coming in is !...', letter);
//   if (wordIndex() >= 1) setSameRound(() => false);

import { getRoundIndex } from '../../context/game.helpers';

//   if (gameOver) return;

//   switch (letter) {
//     case 'Enter': {
//       setSameRound(() => true);
//       if (finalLetter()) {
//         console.log('final enter!');
//         setRoundOver(() => true);
//         updateKeyColors();
//         checkGameOver();
//       }
//       break;
//     }
//     case 'Del':
//     case 'Backspace': {
//       if (allowDelete()) {
//         const boardCopy = [...board];

//         const previousIndex = Math.max(0, globalIndex - 1);

//         if (wordIndex() === 0 && !sameRound) {
//           boardCopy[getRoundIndex() - 1][length - 1] = ' ';
//           setGlobalIndex(() => previousIndex);
//         } else {
//           boardCopy[getRoundIndex()][wordIndex() - 1] = ' ';
//           setGlobalIndex(() => previousIndex);
//         }

//         setBoard(boardCopy);
//         setSameRound(() => true);
//       }

//       break;
//     }
//     case letter.match(/^[a-zA-Z]$/)?.input: {
//       if (sameRound) {
//         console.log('letter matches:', letter);
//         const boardCopy = [...board];
//         if (boardCopy[getRoundIndex()][wordIndex()] === ' ') {
//           boardCopy[getRoundIndex()][wordIndex()] = letter.toUpperCase();
//         }
//         setBoard(boardCopy);

//         if (sameRound) {
//           setGlobalIndex(() => globalIndex + 1);
//         }
//         if (globalIndex > 0 && wordIndex() === length - 1) {
//           setSameRound(() => false);
//         }
//         if (globalIndex > 0 && wordIndex() < length - 1) {
//           setSameRound(() => true);
//         }
//       }
//       break;
//     }
//     default:
//       console.log(letter);
//       setGlobalIndex(globalIndex);
//   }
// };

export const updateKeyColors = (state) => {
  const solutionArray = state.solution.split('');
  let tempKeys = {};
  // const getRoundIndex = (globalIndex, length) => {
  //   return Math.floor(globalIndex / length);
  // };

  // const roundIndex = Math.floor(state.globalIndex / state.wordLength);
  const roundIndex = getRoundIndex(state);

  state.board[roundIndex - 1].forEach((guess, index) => {
    if (state.keyColors[guess] === 'correct' || tempKeys[guess] === 'correct')
      return;
    if (guess === solutionArray[index]) {
      tempKeys = { ...tempKeys, [guess]: 'correct' };
    } else if (state.solution.indexOf(guess) >= 0) {
      tempKeys = { ...tempKeys, [guess]: 'close' };
    } else {
      tempKeys = { ...tempKeys, [guess]: 'incorrect' };
    }
    // setKeyColors((keyColors) => ({ ...keyColors, ...tempKeys }));
    return { ...state.keyColors, ...tempKeys };
  });
};
