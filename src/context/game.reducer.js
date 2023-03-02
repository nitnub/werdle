/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/
import defaultState from './defaultState';
import { updateKeyColors } from '../utils/updateKeyColors';
import {
  allowDelete,
  createBoard,
  finalLetter,
  getRoundIndex,
  getLetterIndex,
  resetBoxes,
} from './game.helpers';
import { action as type } from './game.actions';

const gameStateReducer = (state, action) => {
  switch (action.type) {
    case type.setNewSolution:
      return {
        ...state,
        solution: action.payload,
      };

    case type.resetGame:
      resetBoxes();

      return {
        ...defaultState,
        solution: action.payload.newWord,
        board: createBoard(action.payload.wordLength, action.payload.guesses),
        wordLength: action.payload.wordLength,
        guesses: action.payload.guesses,
      };

    case type.updateRoundOver:
      return {
        ...state,
        roundOver: action.payload,
      };

    case type.endTurn:
      let endTurnState = { ...state, sameRound: true };

      if (getRoundIndex(state) < 1) return state;

      const keyColors = updateKeyColors(state);

      if (finalLetter(state)) {
        endTurnState = {
          ...endTurnState,
          roundOver: true,
          keyColors,
        };
      }
    // eslint: break is omitted intentionally
    case type.checkGameOver:
      const response = state.board[getRoundIndex(state) - 1].join('');
      const goState = endTurnState ? endTurnState : { ...state };

      if (state.solution === response) {
        return {
          ...goState,
          gameOver: true,
          outcome: 1,
          modalVisible: true,
        };
      } else if (getRoundIndex(state) === state.guesses) {
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

    case type.updateSameRound:
      return {
        ...state,
        sameRound: action.payload,
      };

    case type.keyEventDelete:
      if (allowDelete(state)) {
        const boardCopy = [...state.board];

        const previousIndex = Math.max(0, state.globalIndex - 1);
        const letterIndex = getLetterIndex(state);
        const roundIndex = getRoundIndex(state);

        if (letterIndex === 0 && !state.sameRound) {
          boardCopy[roundIndex - 1][state.wordLength - 1] = ' ';
        } else {
          boardCopy[roundIndex][letterIndex - 1] = ' ';
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
    case type.keyEventLetter:
      if (state.sameRound) {
        const boardCopy = [...state.board];
        let newProps = {};

        const letterIndex = getLetterIndex(state);
        const roundIndex = getRoundIndex(state);

        if (boardCopy[roundIndex][letterIndex] === ' ') {
          boardCopy[roundIndex][letterIndex] = action.payload.toUpperCase();
          newProps = { ...newProps, board: boardCopy };
        }

        if (state.sameRound) {
          newProps = { ...newProps, globalIndex: state.globalIndex + 1 };
        }
        if (state.globalIndex > 0 && letterIndex === state.wordLength - 1) {
          newProps = { ...newProps, sameRound: false };
        }
        if (state.globalIndex > 0 && letterIndex < state.wordLength - 1) {
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
    // case type.updateKeyColors:
    //   const solutionArray = state.solution.split('');
    //   let tempKeys = {};

    //   const roundIndex = getRoundIndex(state);

    //   state.board[roundIndex - 1].forEach((guess, index) => {
    //     if (
    //       state.keyColors[guess] === 'correct' ||
    //       tempKeys[guess] === 'correct'
    //     )
    //       return;
    //     if (guess === solutionArray[index]) {
    //       tempKeys = { ...tempKeys, [guess]: 'correct' };
    //     } else if (state.solution.indexOf(guess) >= 0) {
    //       tempKeys = { ...tempKeys, [guess]: 'close' };
    //     } else {
    //       tempKeys = { ...tempKeys, [guess]: 'incorrect' };
    //     }
    //     const keyColors = { ...state.keyColors, ...tempKeys };

    //     return {
    //       ...state,
    //       keyColors,
    //     };
    //   });
    //   break;
    case type.updateModalVisible:
      return {
        ...state,
        modalVisible: action.payload,
      };
    default:
      throw new Error('Invalid game operation.');
  }
};

export default gameStateReducer;
