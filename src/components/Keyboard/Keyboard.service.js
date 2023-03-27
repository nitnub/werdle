import { getRoundIndex } from '../../context/game.helpers';

export const updateKeyColors = (state) => {
  const solutionArray = state.solution.split('');
  let tempKeys = {};

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
    return { ...state.keyColors, ...tempKeys };
  });
};
