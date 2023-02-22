const defaultKeyColors = {};
const defaultLength = 5;
const defaultGuesses = 6;

const createBoard = (wordLength, guessCount) => {
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
  length: defaultLength,
  guesses: defaultGuesses,
};

export default defaultState;
