export const updateKeyColors = (state) => {
  const solutionArray = state.solution.split('');
  console.log('state.solution')
  console.log(state.solution)
  // let tempKeys = {};
  let tempKeys = state.keyColors;
  // const getRoundIndex = (globalIndex, length) => {
  //   return Math.floor(globalIndex / length);
  // };

  const roundIndex = Math.floor(state.globalIndex / state.wordLength);
  // const Math.max(roundIndex -1, 0)
  // console.log("ri:", roundIndex)
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
    // tempKeys = { ...tempKeys, ...state.keyColors };
    // return { ...state.keyColors, ...tempKeys };
  });

  return tempKeys;
};
