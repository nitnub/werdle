import { getRoundIndex } from '../../context/game.helpers';
import { action } from '../../context/game.actions';

export class KeyboardService {
  letters = [...Array(26)].map((elem, index) =>
    String.fromCharCode(index + 97)
  );

  dispatch;

  constructor(dispatch) {
    this.dispatch = dispatch;
  }
  // dispatchKeyEntry = (dispatch, guess) => {
  dispatchKeyEntry = (guess) => {
    if (this.letters.includes(guess))
      this.dispatch({ type: action.keyEventLetter, payload: guess });
    else if (['backspace', 'del'].includes(guess))
      this.dispatch({ type: action.keyEventDelete, payload: guess });
    else if (guess === 'enter')
      this.dispatch({ type: action.endTurn, payload: guess });
  };

  updateKeyColors = (state) => {
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
}

// export const updateKeyColors = (state) => {
//   const solutionArray = state.solution.split('');
//   let tempKeys = {};

//   const roundIndex = getRoundIndex(state);

//   state.board[roundIndex - 1].forEach((guess, index) => {
//     if (state.keyColors[guess] === 'correct' || tempKeys[guess] === 'correct')
//       return;
//     if (guess === solutionArray[index]) {
//       tempKeys = { ...tempKeys, [guess]: 'correct' };
//     } else if (state.solution.indexOf(guess) >= 0) {
//       tempKeys = { ...tempKeys, [guess]: 'close' };
//     } else {
//       tempKeys = { ...tempKeys, [guess]: 'incorrect' };
//     }
//     return { ...state.keyColors, ...tempKeys };
//   });
// };
