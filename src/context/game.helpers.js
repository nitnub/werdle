export const createBoard = (wordLength, guessCount) => {
  let round = Array(wordLength).fill(' ');
  let game = [];

  for (let i = 0; i < guessCount; i++) {
    game.push([...round]);
  }
  return game;
};

export const getRoundIndex = (state) => {
  return Math.floor(state.globalIndex / state.wordLength);
};

export const finalLetter = (state) => {
  if (state.globalIndex === 0) return false;
  return state.globalIndex % state.wordLength === 0;
};

export const getLetterIndex = (state) => {
  return state.globalIndex % state.wordLength;
};

export const allowDelete = (state) => {
  if (state.globalIndex === 0) return false;
  if (!state.sameRound && getLetterIndex(state) === 0) return true;
  if (getLetterIndex(state) === 0) return false;

  return true;
};


export const resetBoxes = () => {
  const elementArray = document.getElementsByClassName('box');

  for (let box of elementArray) {
    box.className = 'box undefined';
  }
};
