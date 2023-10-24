import getWordOfLength from './getWordOfLength';
import { action } from '../context/game.actions';
export default async function resetHandler(state, dispatch) {
  const newWord = await getWordOfLength(state.wordLength);
  const payload = {
    newWord,
    wordLength: state.wordLength,
    guesses: state.guesses,
  };
  dispatch({ type: action.resetGame, payload });
}
