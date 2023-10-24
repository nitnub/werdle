import each from 'jest-each';
import '@testing-library/jest-dom';
import gameStateReducer from '../game.reducer';

describe('game.reducer test suite', () => {
  const defaultKeyColors = {};
  const defaultLength = 5;
  const defaultGuesses = 6;

  const blankBoard = [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];

  const blankBoardPlusM = [
    ['M', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];

  const firstRoundOneLetterBoard = [
    ['A', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];

  const firstRoundOneLetterBoardPlusM = [
    ['A', 'M', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];

  const midGameFirstLetterBoard = [
    ['H', 'Y', 'Z', 'M', 'B'],
    ['P', 'R', 'L', 'Y', 'N'],
    ['A', 'N', 'H', 'G', 'R'],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];

  const midGameFirstLetterBoardPlusM = [
    ['H', 'Y', 'Z', 'M', 'B'],
    ['P', 'R', 'L', 'Y', 'N'],
    ['A', 'N', 'H', 'G', 'R'],
    ['M', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];

  const midGameMidLetterBoard = [
    ['H', 'Y', 'Z', 'M', 'B'],
    ['P', 'R', 'L', 'Y', 'N'],
    ['A', 'N', 'H', 'G', 'R'],
    ['A', 'F', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];

  const midGameMidLetterBoardPlusM = [
    ['H', 'Y', 'Z', 'M', 'B'],
    ['P', 'R', 'L', 'Y', 'N'],
    ['A', 'N', 'H', 'G', 'R'],
    ['A', 'F', 'M', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];

  const midGameLastLetterBoard = [
    ['H', 'Y', 'Z', 'M', 'B'],
    ['P', 'R', 'L', 'Y', 'N'],
    ['A', 'N', 'H', 'G', 'R'],
    ['A', 'F', 'Q', 'R', 'K'],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];

  const winningGameBoard = [
    ['H', 'Y', 'Z', 'M', 'B'],
    ['P', 'R', 'L', 'Y', 'N'],
    ['A', 'N', 'H', 'G', 'R'],
    ['V', 'A', 'L', 'I', 'D'],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];

  const losingGameBoard = [
    ['H', 'Y', 'Z', 'M', 'B'],
    ['P', 'R', 'L', 'Y', 'N'],
    ['A', 'N', 'H', 'G', 'R'],
    ['A', 'F', 'Q', 'R', 'K'],
    ['X', 'D', 'N', 'I', 'O'],
    ['Q', 'N', 'H', 'G', 'R'],
  ];

  // test default state
  const testState = {
    solution: 'VALID',
    board: blankBoard,
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

  let newGameState = {};
  let firstRoundOneLetterState = {};
  let midGameFirstLetterState = {};
  let midGameMidLetterState = {};
  let midGameLastLetterState = {};
  let winningGameState = {};
  let losingGameState = {};

  newGameState = {
    ...testState,
    ...{
      testDescription: 'new game',
    },
  };
  firstRoundOneLetterState = {
    ...testState,
    ...{
      board: firstRoundOneLetterBoard,
      globalIndex: 1,
      testDescription: 'first round one letter',
    },
  };
  midGameFirstLetterState = {
    ...testState,
    ...{
      board: midGameFirstLetterBoard,
      keyColors: {
        H: 'incorrect',
        Y: 'incorrect',
        Z: 'incorrect',
        M: 'incorrect',
        B: 'incorrect',
        P: 'incorrect',
        R: 'incorrect',
        L: 'correct',
        N: 'incorrect',
        A: 'close',
        G: 'incorrect',
      },

      globalIndex: 15,
      testDescription: 'mid game, first letter',
    },
  };
  midGameMidLetterState = {
    ...testState,
    ...{
      board: midGameMidLetterBoard,
      keyColors: {
        H: 'incorrect',
        Y: 'incorrect',
        Z: 'incorrect',
        M: 'incorrect',
        B: 'incorrect',
        P: 'incorrect',
        R: 'incorrect',
        L: 'correct',
        N: 'incorrect',
        A: 'close',
        G: 'incorrect',
      },
      globalIndex: 17,
      testDescription: 'mid game, mid letter',
    },
  };
  midGameLastLetterState = {
    ...testState,
    ...{
      board: midGameLastLetterBoard,
      keyColors: {
        H: 'incorrect',
        Y: 'incorrect',
        Z: 'incorrect',
        M: 'incorrect',
        B: 'incorrect',
        P: 'incorrect',
        R: 'incorrect',
        L: 'correct',
        N: 'incorrect',
        A: 'close',
        G: 'incorrect',
      },
      globalIndex: 19,
      sameRound: false,
      testDescription: 'mid game, final letter',
    },
  };
  winningGameState = {
    ...testState,
    ...{
      board: winningGameBoard,

      keyColors: {
        H: 'incorrect',
        Y: 'incorrect',
        Z: 'incorrect',
        M: 'incorrect',
        B: 'incorrect',
        P: 'incorrect',
        R: 'incorrect',
        L: 'correct',
        N: 'incorrect',
        A: 'close',
        G: 'incorrect',
      },
      globalIndex: 20,
      sameRound: false,
      testDescription: 'winning game state',
    },
  };
  losingGameState = {
    ...testState,
    ...{
      board: losingGameBoard,
      keyColors: {
        H: 'incorrect',
        Y: 'incorrect',
        Z: 'incorrect',
        M: 'incorrect',
        B: 'incorrect',
        P: 'incorrect',
        R: 'incorrect',
        L: 'correct',
        N: 'incorrect',
        A: 'close',
        G: 'incorrect',
        F: 'incorrect',
        Q: 'incorrect',
        K: 'incorrect',
        X: 'incorrect',
        D: 'close',
        I: 'correct',
        O: 'incorrect',
      },
      globalIndex: 30,
      sameRound: false,
      testDescription: 'losing game state',
    },
  };

  const testCases = [
    newGameState,
    firstRoundOneLetterState,
    midGameFirstLetterState,
    midGameMidLetterState,
    midGameLastLetterState,
    winningGameState,
    losingGameState,
  ];

  describe("raw reducer 'case' input tests...", () => {
    it('UPDATE_SAME_ROUND = False', () => {
      const expectedOutputFalse = {
        ...testState,
        sameRound: false,
      };

      const output = gameStateReducer(testState, {
        type: 'UPDATE_SAME_ROUND',
        payload: false,
      });

      expect(output).toEqual(expectedOutputFalse);
    });

    it('UPDATE_SAME_ROUND = True', () => {
      const expectedOutputTrue = {
        ...testState,
        sameRound: true,
      };

      const output = gameStateReducer(testState, {
        type: 'UPDATE_SAME_ROUND',
        payload: true,
      });

      expect(output).toEqual(expectedOutputTrue);
    });

    it('UPDATE_ROUND_OVER = True', () => {
      const expectedOutput = {
        ...testState,
        roundOver: true,
      };

      const output = gameStateReducer(testState, {
        type: 'UPDATE_ROUND_OVER',
        payload: true,
      });

      expect(output).toEqual(expectedOutput);
    });

    it('UPDATE_ROUND_OVER = False', () => {
      const expectedOutput = {
        ...testState,
        roundOver: false,
      };

      const output = gameStateReducer(testState, {
        type: 'UPDATE_ROUND_OVER',
        payload: false,
      });

      expect(output).toEqual(expectedOutput);
    });

    it('UPDATE_MODAL_VISIBLE = True', () => {
      const expectedOutput = {
        ...testState,
        modalVisible: true,
      };
      const output = gameStateReducer(testState, {
        type: 'UPDATE_MODAL_VISIBLE',
        payload: true,
      });

      expect(output).toEqual(expectedOutput);
    });

    it('UPDATE_MODAL_VISIBLE = False', () => {
      const expectedOutput = {
        ...testState,
        modalVisible: false,
      };
      const output = gameStateReducer(testState, {
        type: 'UPDATE_MODAL_VISIBLE',
        payload: false,
      });

      expect(output).toEqual(expectedOutput);
    });

    it('SET_NEW_SOLUTION', () => {
      const output = gameStateReducer(testState, {
        type: 'SET_NEW_SOLUTION',
        payload: 'STAMP',
      });

      const expectedOutput = {
        ...testState,
        solution: 'STAMP',
      };

      expect(output).toStrictEqual(expectedOutput);
    });
  });

  describe('game resets when state is...', () => {
    each(testCases).it('$testDescription', (startState) => {
      const resizedBlankBoard = [
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
      ];

      const payload = {
        newWord: 'apples',
        wordLength: 6,
        guesses: 7,
      };

      const expectedOutput = {
        ...testState,
        solution: payload.newWord,
        board: resizedBlankBoard,
        wordLength: payload.wordLength,
        guesses: payload.guesses,
      };

      const output = gameStateReducer(startState, {
        type: 'RESET_GAME',
        payload,
      });

      expect(output).toEqual(expectedOutput);
    });
  });

  describe('delete event...', () => {
    const newWinningIndex = winningGameState.globalIndex - 1;
    const newLosingIndex = losingGameState.globalIndex - 1;
    const newMidIndex = midGameMidLetterState.globalIndex - 1;
    const newLastIndex = midGameLastLetterState.globalIndex - 1;

    let deleteTestCases = [
      [newGameState.testDescription, newGameState, {}],
      [
        firstRoundOneLetterState.testDescription,
        firstRoundOneLetterState,
        { globalIndex: 0, sameRound: true },
      ],
      [midGameFirstLetterState.testDescription, midGameFirstLetterState, {}],
      [
        midGameMidLetterState.testDescription,
        midGameMidLetterState,
        { globalIndex: newMidIndex },
      ],
      [
        midGameLastLetterState.testDescription,
        midGameLastLetterState,
        { globalIndex: newLastIndex, sameRound: true },
      ],
      [
        winningGameState.testDescription,
        winningGameState,
        { globalIndex: newWinningIndex, sameRound: true },
      ],
      [
        losingGameState.testDescription,
        losingGameState,
        { globalIndex: newLosingIndex, sameRound: true },
      ],
    ];
    each(deleteTestCases).it('%s', (_, startState, stateChanges) => {
      const stateCopy = JSON.parse(JSON.stringify(startState)); // structuredClone not available in this release
      const expectedState = { ...stateCopy, ...stateChanges };

      const newState = gameStateReducer(stateCopy, {
        type: 'KEY_EVENT_DELETE',
      });

      expect(newState).toEqual(expectedState);
    });
  });

  describe('key press event (M)...', () => {
    const newMidIndex = midGameMidLetterState.globalIndex + 1;

    let validKeyEventTestCases = [
      [
        midGameLastLetterState.testDescription,
        midGameLastLetterState,
        { sameRound: false },
      ],
      [
        newGameState.testDescription,
        newGameState,
        { globalIndex: 1, board: blankBoardPlusM },
      ],
      [
        firstRoundOneLetterState.testDescription,
        firstRoundOneLetterState,
        {
          globalIndex: firstRoundOneLetterState.globalIndex + 1,
          board: firstRoundOneLetterBoardPlusM,
        },
      ],
      [
        midGameFirstLetterState.testDescription,
        midGameFirstLetterState,
        {
          globalIndex: midGameFirstLetterState.globalIndex + 1,
          board: midGameFirstLetterBoardPlusM,
        },
      ],
      [
        midGameMidLetterState.testDescription,
        midGameMidLetterState,
        { globalIndex: newMidIndex, board: midGameMidLetterBoardPlusM },
      ],
      [
        midGameLastLetterState.testDescription,
        midGameLastLetterState,
        { sameRound: false },
      ],
      [
        winningGameState.testDescription,
        winningGameState,
        { sameRound: false },
      ],
      [losingGameState.testDescription, losingGameState, { sameRound: false }],
    ];
    each(validKeyEventTestCases).it('%s', (_, startState, stateChanges) => {
      const expectedState = { ...startState, ...stateChanges };

      const newState = gameStateReducer(startState, {
        type: 'KEY_EVENT_LETTER',
        payload: 'M',
      });

      expect(newState).toEqual(expectedState);
    });
  });

  describe('verifies game over state is...', () => {
    const gameOvertestCases = [
      [
        midGameLastLetterState.testDescription,
        midGameLastLetterState,
        {
          roundOver: false,
          sameRound: true,
          keyColors: {
            H: 'incorrect',
            Y: 'incorrect',
            Z: 'incorrect',
            M: 'incorrect',
            B: 'incorrect',
            P: 'incorrect',
            R: 'incorrect',
            L: 'correct',
            N: 'incorrect',
            A: 'close',
            G: 'incorrect',
          },
        },
      ],
      [
        winningGameState.testDescription,
        winningGameState,
        {
          gameOver: true,
          outcome: 1,
          modalVisible: true,
          roundOver: true,
          sameRound: true,
          keyColors: {
            H: 'incorrect',
            Y: 'incorrect',
            Z: 'incorrect',
            M: 'incorrect',
            B: 'incorrect',
            P: 'incorrect',
            R: 'incorrect',
            L: 'correct',
            N: 'incorrect',
            A: 'correct',
            G: 'incorrect',
            V: 'correct',
            D: 'correct',
            I: 'correct',
          },
        },
      ],
      [
        losingGameState.testDescription,
        losingGameState,
        {
          gameOver: true,
          outcome: 2,
          modalVisible: true,
          roundOver: true,
          sameRound: true,
        },
      ],
    ];

    each(gameOvertestCases).it('%s', (_, startState, stateChanges) => {
      const stateCopy = JSON.parse(JSON.stringify(startState)); // structuredClone not available in this release
      const expectedState = { ...stateCopy, ...stateChanges };

      const newState = gameStateReducer(stateCopy, {
        type: 'END_TURN',
      });

      expect(newState).toEqual(expectedState);
    });
  });

  it('throws error when given invalid operation', () => {
    expect(() =>
      gameStateReducer(winningGameState, {
        type: 'INVALID_TYPE',
      })
    ).toThrowError('Invalid game operation.');
    expect(() =>
      gameStateReducer(123, {
        type: 'INVALID_TYPE',
      })
    ).toThrowError('Invalid game operation.');
    expect(() =>
      gameStateReducer('aString', {
        type: 'INVALID_TYPE',
      })
    ).toThrowError('Invalid game operation.');
  });
});
