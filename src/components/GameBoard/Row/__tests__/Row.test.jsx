import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import mockState from '../../../../context/defaultState';
import Row from '../Row';

jest.mock('../../../../context/defaultState', () => ({
  solution: '',
  board: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
  roundOver: true,
  keyColors: {},
  globalIndex: 10,
  modalVisible: false,
  sameRound: true,
  gameOver: false,
  outcome: 0,
  wordLength: 5,
  guesses: 6,
}));

const dispatchMock = jest.fn();

function setup() {
  render(
    <Row
      key={1}
      id={1}
      round={mockState.board[0]}
      state={mockState}
      dispatch={dispatchMock}
    />
  );
}

beforeEach(() => {
  setup();
});

afterEach(cleanup);

describe('Row test suite', () => {
  it.only('moves to next round when index crosses letter length', () => {
    expect(dispatchMock).toBeCalledTimes(2);

    expect(dispatchMock).toBeCalledWith({
      type: 'UPDATE_SAME_ROUND',
      payload: true,
    });

    expect(dispatchMock).toBeCalledWith({
      type: 'UPDATE_ROUND_OVER',
      payload: false,
    });
  });
});
