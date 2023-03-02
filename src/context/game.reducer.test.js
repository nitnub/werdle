import gameStateReducer from './game.reducer';

const defaultKeyColors = {};
const defaultLength = 5;
const defaultGuesses = 6;

const testBoard = [
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
];

// test default state
const testState = {
  solution: '',
  board: testBoard,
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

describe('Reducer functionality', () => {
  it('RESET_GAME test', () => {
    const testBoard = [
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
      board: testBoard,
      wordLength: payload.wordLength,
      guesses: payload.guesses,
    };

    const output = gameStateReducer(testState, { type: 'RESET_GAME', payload });

    expect(output).toStrictEqual(expectedOutput);
  });

  it('SET_NEW_SOLUTION test', () => {
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

  it('KEY_EVENT_DELETE First letter of first word', () => {
    const startState = {
      ...testState,
    };

    const expectedOutput = {
      ...testState,
    };

    const output = gameStateReducer(startState, { type: 'KEY_EVENT_DELETE' });

    expect(output).toEqual(expectedOutput);
  });

  it('KEY_EVENT_DELETE First letter of subsequent word', () => {
    const startState = {
      ...testState,
      globalIndex: defaultLength,
    };

    const expectedOutput = {
      ...testState,
      globalIndex: defaultLength,
    };

    const output = gameStateReducer(startState, { type: 'KEY_EVENT_DELETE' });

    expect(output).toEqual(expectedOutput);
  });

  it('KEY_EVENT_DELETE Middle letter', () => {
    const startState = {
      ...testState,
      globalIndex: 14,
    };

    const expectedOutput = {
      ...testState,
      globalIndex: 13,
    };

    const output = gameStateReducer(startState, { type: 'KEY_EVENT_DELETE' });

    expect(output).toEqual(expectedOutput);
  });

  it('KEY_EVENT_DELETE Last letter', () => {
    const startState = {
      ...testState,
      globalIndex: 4,
      wordLength: 5,
    };

    const expectedOutput = {
      ...testState,
      globalIndex: 3,
      wordLength: 5,
    };

    const output = gameStateReducer(startState, { type: 'KEY_EVENT_DELETE' });

    expect(output).toEqual(expectedOutput);
  });

  it('KEY_EVENT_LETTER First letter of first word', () => {
    const outputBoard = [
      ['A', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
    ];

    const startState = {
      ...testState,
    };

    const expectedOutput = {
      ...testState,
      globalIndex: 1,
      board: outputBoard,
    };

    const output = gameStateReducer(startState, {
      type: 'KEY_EVENT_LETTER',
      payload: 'a',
    });

    expect(output).toEqual(expectedOutput);
  });

  it('KEY_EVENT_LETTER First letter of subsequent word', () => {
    const inputBoard = [
      ['A', 'P', 'P', 'L', 'E'],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
    ];
    const outputBoard = [
      ['A', 'P', 'P', 'L', 'E'],
      ['B', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
    ];

    const startState = {
      ...testState,
      globalIndex: defaultLength,
      board: inputBoard,
    };

    const expectedOutput = {
      ...testState,
      globalIndex: defaultLength + 1,
      board: outputBoard,
    };

    const output = gameStateReducer(startState, {
      type: 'KEY_EVENT_LETTER',
      payload: 'B',
    });

    expect(output).toEqual(expectedOutput);
  });

  it('KEY_EVENT_LETTER Middle letter', () => {
    const inputBoard = [
      ['A', 'P', 'P', 'L', 'E'],
      ['B', 'O', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
    ];
    const outputBoard = [
      ['A', 'P', 'P', 'L', 'E'],
      ['B', 'O', 'A', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
    ];

    const startState = {
      ...testState,
      board: inputBoard,
      globalIndex: 7,
    };

    const expectedOutput = {
      ...testState,
      board: outputBoard,
      globalIndex: 8,
    };

    const output = gameStateReducer(startState, {
      type: 'KEY_EVENT_LETTER',
      payload: 'A',
    });

    expect(output).toEqual(expectedOutput);
  });

  it('KEY_EVENT_LETTER After last letter, before close of round', () => {
    const board = [
      ['A', 'P', 'P', 'L', 'E'],
      ['B', 'O', 'A', 'T', 'S'],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
    ];

    const startState = {
      ...testState,
      board,
      globalIndex: 9,
      wordLength: 5,
      sameRound: false,
    };

    const expectedOutput = {
      ...testState,
      board,
      globalIndex: 9,
      wordLength: 5,
      sameRound: false,
    };

    const output = gameStateReducer(startState, {
      type: 'KEY_EVENT_LETTER',
      payload: 'M',
    });

    expect(output).toEqual(expectedOutput);
  });

  it('END_TURN test', () => {
    const testBoard = [
      ['S', 'T', 'A', 'M', 'P'],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
    ];
    const gameOverTrue = {
      solution: 'STAMP',
      board: testBoard,
      roundOver: false,
      keyColors: defaultKeyColors,
      globalIndex: 5,
      modalVisible: false,
      sameRound: false,
      gameOver: false,
      outcome: 0,
      wordLength: defaultLength,
      guesses: defaultGuesses,
    };
    const expectedOutput = {
      solution: 'STAMP',
      board: testBoard,
      roundOver: true,
      keyColors: {
        S: 'correct',
        T: 'correct',
        A: 'correct',
        M: 'correct',
        P: 'correct',
      },
      globalIndex: 5,
      modalVisible: true,
      sameRound: true,
      gameOver: true,
      outcome: 1,
      wordLength: defaultLength,
      guesses: defaultGuesses,
    };

    const output = gameStateReducer(gameOverTrue, {
      type: 'END_TURN',
      payload: 'Enter',
    });

    expect(output).toEqual(expectedOutput);
  });
});
