import { action } from '../context/game.actions';
import getWordOfLength from './getWordOfLength';

export default async function gameUpdateHandler(state, dispatch, tempValues) {
  const newWord = await getWordOfLength(state.wordLength);
  const payload = { ...tempValues, newWord };

  dispatch({ type: action.resetGame, payload });
}
