export const updateKeyColors = (state) => {
  const solutionArray = state.solution.split('');
  let tempKeys = {};
  // const getRoundIndex = (globalIndex, length) => {
  //   return Math.floor(globalIndex / length);
  // };
  
  const roundIndex = Math.floor(state.globalIndex / state.length);

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