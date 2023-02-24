const defaultKeyColors = {};
const defaultLength = 5;
const defaultGuesses = 6;

// export const action = {
//   resetGame: 'RESET_GAME',
//   setNewSolution: 'SET_NEW_SOLUTION',
//   checkGameOver: 'CHECK_GAME_OVER',
//   updateSameRound: 'UPDATE_SAME_ROUND',
//   updateRoundOver: 'UPDATE_ROUND_OVER',
//   updateModalVisible: 'UPDATE_MODAL_VISIBLE',
//   updateMaxGuesses: 'UPDATE_MAX_GUESSES',
//   updateWordLength: 'UPDATE_WORD_LENGTH',
//   keyEventDelete: 'KEY_EVENT_DELETE',
//   keyEventLetter: 'KEY_EVENT_LETTER',
//   endTurn: 'END_TURN',
//   updateKeyColors: 'UPDATE_KEY_COLORS',
// };



export const createBoard = (wordLength, guessCount) => {
  let round = Array(wordLength).fill(' ');
  let game = [];
  for (let i = 0; i < guessCount; i++) {
    game.push([...round]);
  }
  return game;
};
let game = createBoard(defaultLength, defaultGuesses);




const defaultState = {
  solution: '',
  board: game,
  roundOver: false,
  keyColors: defaultKeyColors,
  globalIndex: 0,
  modalVisible: false,
  sameRound: true,
  gameOver: false,
  outcome: 0,
  wordLength: defaultLength,
  guesses: defaultGuesses,
};

export default defaultState;
