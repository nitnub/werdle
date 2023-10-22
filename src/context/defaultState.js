import { createBoard } from './game.helpers';

const defaultKeyColors = {};
const defaultLength = 5;
const defaultGuesses = 6;

const game = createBoard(defaultLength, defaultGuesses);

// export const defaultState = {
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
