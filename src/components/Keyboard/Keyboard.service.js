import { getRoundIndex } from '../../context/game.helpers';
import { action } from '../../context/game.actions';

export class KeyboardService {
  state;
  dispatch;

  deleteOptions = ['backspace', 'del'];
  letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  constructor(state, dispatch) {
    this.state = state;
    this.dispatch = dispatch;
    this.keyPressHandler = this.keyPressHandler.bind(this); // maintain proper scope
    this.keyClickHandler = this.keyClickHandler.bind(this); // maintain proper scope
  }

  keyPressHandler(e) {
    this.dispatchKeyEntry(e.key);
  }

  keyClickHandler(e) {
    this.dispatchKeyEntry(e.target.innerText);
  }

  dispatchKeyEntry(guess) {
    guess = guess.toLowerCase();
    if (this.letters.includes(guess))
      this.dispatch({ type: action.keyEventLetter, payload: guess });
    else if (this.deleteOptions.includes(guess))
      this.dispatch({ type: action.keyEventDelete });
    else if (guess === 'enter') this.dispatch({ type: action.endTurn });
  }

  getLayout(style = 'QWERTY') {
    const QWERTY = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Del'],
    ];

    switch (style) {
      case 'QWERTY':
      default:
        return QWERTY;
    }
  }
}
