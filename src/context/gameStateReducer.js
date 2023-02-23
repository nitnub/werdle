/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/
import defaultState from './defaultState';
// import { updateKeyColors } from '../components/Keyboard/Keyboard.service';
import { updateKeyColors } from '../utils/updateKeyColors';
import getWordOfLength from '../utils/getWordOfLength';

export const action = {
  resetGame: 'RESET_GAME',
  setNewSolution: 'SET_NEW_SOLUTION',
  checkGameOver: 'CHECK_GAME_OVER',
  updateSameRound: 'UPDATE_SAME_ROUND',
  updateRoundOver: 'UPDATE_ROUND_OVER',
  updateModalVisible: 'UPDATE_MODAL_VISIBLE',
  updateMaxGuesses: 'UPDATE_MAX_GUESSES',
  updateWordLength: 'UPDATE_WORD_LENGTH',
  keyEventDelete: 'KEY_EVENT_DELETE',
  keyEventLetter: 'KEY_EVENT_LETTER',
  endTurn: 'END_TURN',
  updateKeyColors: 'UPDATE_KEY_COLORS',
};

const gameStateReducer = (state, action) => {
  // console.info('Accessing reducer with the following data:');
  // console.log(`     state:`, state);
  // console.log(`     action:`, action);

  const getRoundIndex = () => {
    return Math.floor(state.globalIndex / state.wordLength);
  };

  const finalLetter = () => {
    if (state.globalIndex === 0) return false;
    return state.globalIndex % state.wordLength === 0;
  };

  const wordIndex = () => {
    return state.globalIndex % state.wordLength;
  };

  const allowDelete = () => {
    if (state.globalIndex === 0) return false;
    if (!state.sameRound && wordIndex() === 0) return true;
    if (wordIndex() === 0) return false;

    console.log('trearfea false');
    return true;
  };

  const removeClasses = (str, classArray) => {
    const elementArray = document.getElementsByClassName(str);
    for (let box of elementArray) {
      box.className = 'box undefined';
    }
    console.log(elementArray);
  };

  const resetBoxes = () => {
    removeClasses('box', ['correct', 'incorrect', 'close']);
  };

  switch (action.type) {
    case 'SET_NEW_SOLUTION':
      return {
        ...state,
        solution: action.payload,
      };

    case 'RESET_GAME':
      const removeClasses = (str, classArray) => {
        const elementArray = document.getElementsByClassName(str);
        for (let box of elementArray) {
          box.className = 'box undefined';
        }
        console.log(elementArray);
      };
      const resetBoxes = () => {
        removeClasses('box', ['correct', 'incorrect', 'close']);
      };
      resetBoxes();
      return {
        // ...state,
        // solution: await getWordOfLength(state.wordLength),
        // board: createBoard(state.wordLength, state.guesses),
        // roundOver: false,
        // keyColors: defaultKeyColors,
        // globalIndex: 0,
        // sameRound: true,
        // gameOver: false,
        // outcome: 0,
        ...defaultState,

        length: state.wordLength,
        gueses: state.guesses,
      };

    case 'UPDATE_ROUND_OVER':
      return {
        ...state,
        roundOver: action.payload,
      };

    case 'GET_NEW_SOLUTION':
      return {
        ...state,
        solution: action.payload,
      };

    case 'END_TURN':
      let endTurnState = { ...state, sameRound: true };

      const keyColors = updateKeyColors(state);
      if (finalLetter()) {
        endTurnState = {
          ...endTurnState,
          // sameRound: true,
          roundOver: true,
          keyColors,
          // updateKeyColors();
          // checkGameOver(); // needs to be included as separate reducer call
        };
      }
    // eslint: break is omitted intentionally
    case 'CHECK_GAME_OVER':
      const response = state.board[getRoundIndex() - 1].join('');
      const goState = endTurnState ? endTurnState : { ...state };
      console.log('Checking game over with response:', response);
      console.log('Checking game over with game over state:', goState);
      if (state.solution === response) {
        return {
          ...goState,
          gameOver: true,
          outcome: 1,
          modalVisible: true,
        };
      } else if (getRoundIndex() === state.guesses) {
        return {
          ...goState,
          gameOver: true,
          outcome: 2,
          modalVisible: true,
        };
      }
      return {
        ...goState,
      };

    case 'UPDATE_MAX_GUESSES':
      return {
        ...state,
        guesses: action.payload,
      };

    case 'UPDATE_WORD_LENGTH':
      return {
        ...state,
        wordLength: action.payload,
      };

    case 'UPDATE_SAME_ROUND':
      return {
        ...state,
        sameRound: action.payload,
      };

    case 'KEY_EVENT_DELETE':
      if (allowDelete()) {
        const boardCopy = [...state.board];

        const previousIndex = Math.max(0, state.globalIndex - 1);

        if (wordIndex() === 0 && !state.sameRound) {
          boardCopy[getRoundIndex() - 1][state.wordLength - 1] = ' ';
        } else {
          boardCopy[getRoundIndex()][wordIndex() - 1] = ' ';
        }

        return {
          ...state,
          board: boardCopy,
          globalIndex: previousIndex,
          sameRound: true,
        };
      }
      return {
        ...state,
      };
      break;
    case 'KEY_EVENT_LETTER':
      if (state.sameRound) {
        // console.log('letter matches:', letter);
        const boardCopy = [...state.board];
        let newProps = {};
        if (boardCopy[getRoundIndex()][wordIndex()] === ' ') {
          boardCopy[getRoundIndex()][wordIndex()] =
            action.payload.toUpperCase();
          newProps = { ...newProps, board: boardCopy };
        }

        // setBoard(boardCopy);

        if (state.sameRound) {
          // setGlobalIndex(() => globalIndex + 1);
          newProps = { ...newProps, globalIndex: state.globalIndex + 1 };
        }
        if (state.globalIndex > 0 && wordIndex() === state.wordLength - 1) {
          // setSameRound(() => false);
          newProps = { ...newProps, sameRound: false };
        }
        if (state.globalIndex > 0 && wordIndex() < state.wordLength - 1) {
          // setSameRound(() => true);
          newProps = { ...newProps, sameRound: true };
        }
        return {
          ...state,
          ...newProps,
        };
      }
      return {
        ...state,
      };
      break;

    case 'UPDATE_KEY_COLORS':
      const solutionArray = state.solution.split('');
      let tempKeys = {};

      const roundIndex = getRoundIndex(state.globalIndex, state.wordLength);

      state.board[roundIndex - 1].forEach((guess, index) => {
        if (
          state.keyColors[guess] === 'correct' ||
          tempKeys[guess] === 'correct'
        )
          return;
        if (guess === solutionArray[index]) {
          tempKeys = { ...tempKeys, [guess]: 'correct' };
        } else if (state.solution.indexOf(guess) >= 0) {
          tempKeys = { ...tempKeys, [guess]: 'close' };
        } else {
          tempKeys = { ...tempKeys, [guess]: 'incorrect' };
        }
        // setKeyColors((keyColors) => ({ ...keyColors, ...tempKeys }));
        const keyColors = { ...state.keyColors, ...tempKeys };

        return {
          ...state,
          keyColors,
        };
      });
      break;

    case 'UPDATE_MODAL_VISIBLE':
      return {
        ...state,
        modalVisible: action.payload,
      };
    //////////////////////////////////////////////////////////////
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export default gameStateReducer;
