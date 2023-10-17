import getWordOfLength from './getWordOfLength';

// export const resetHandler = async (state, dispatch) => {

// const aaa = {
  // async resetHandler(state, dispatch) {
    export default async function resetHandler(state, dispatch) {
    const newWord = await getWordOfLength(state.wordLength);
    const payload = {
      newWord,
      wordLength: state.wordLength,
      guesses: state.guesses,
    };
    dispatch({ type: 'RESET_GAME', payload });
  }
// };
// module.exports = { aaa };
