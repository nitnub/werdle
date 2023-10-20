import { getRoundIndex } from '../../context/game.helpers';
import { action } from '../../context/game.actions';

export class KeyboardService {
  state;
  dispatch;

  deleteOptions = ['backspace', 'del'];
  letters = [...Array(26)].map((elem, index) =>
    String.fromCharCode(index + 97)
  );

  constructor(state, dispatch) {
    this.state = state;
    this.dispatch = dispatch;
  }

  keyPressHandler = (e) => {
    this.dispatchKeyEntry(e.key);
  };

  keyClickHandler = (e) => {
    this.dispatchKeyEntry(e.target.innerText);
  };

  dispatchKeyEntry = (guess) => {
    guess = guess.toLowerCase();
    if (this.letters.includes(guess))
      this.dispatch({ type: action.keyEventLetter, payload: guess });
    else if (this.deleteOptions.includes(guess))
      this.dispatch({ type: action.keyEventDelete, payload: guess });
    else if (guess === 'enter')
      this.dispatch({ type: action.endTurn, payload: guess });
  };

  getLayout = (style = 'QWERTY') => {
    const QWERTY = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Del'],
    ];

    switch (style) {
      case 'QWERTY':
        return QWERTY;
      default:
        return QWERTY;
    }
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
