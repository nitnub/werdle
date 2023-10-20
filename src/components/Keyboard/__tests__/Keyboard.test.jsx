/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Keyboard from '..';

const dispatchMock = jest.fn();
const defaultKeyColors = {};
let container;
const testState = {
  // solution: 'VALID',
  // board: blankBoard,
  // roundOver: false,
  keyColors: defaultKeyColors,
  // globalIndex: 0,
  // modalVisible: false,
  // sameRound: true,
  gameOver: false,
  // outcome: 0,
  // wordLength: defaultLength,
  // guesses: defaultGuesses,
};

// const keyProps = { state: testState, dispatch: dispatchMock };

async function setup() {
  render(<Keyboard state={testState} dispatch={dispatchMock} />);
}

beforeEach(() => {
  setup();
});

afterEach(cleanup);

describe('Keyboard test suite', () => {
  describe('keyboard', () => {
    it('displays all keys', () => {});
    it.todo('adds letters to board');
    it.todo('deletes letters from board');
    it.todo('checks word');
    it.todo('shows winning modal with correct guess');
    it.todo('shows losing modal with losing game board is submitted');
  });

  it('calls the delete action on press of "Del" key', () => {
    const label = 'Enter';
    const key = screen.getByText(label);
    // const key = screen.queryByText('Enter');

    const testEvent = {
      target: {
        innerText: label,
      },
    };
    act(() => {
      userEvent.click(key, testEvent);
      // userEvent.click(key.childNodes[0]);
    });

    console.log('key.innerText');
    console.log(key.target);
    console.log('key.innerText');

    expect(dispatchMock).toHaveBeenCalledTimes(2);

    // const inputs = container.querySelectorAll('button');
    // console.log('inputs');
    // console.log(inputs);
    // console.log('inputs');
  });
  it.todo('calls the enter action on press of "Enter" key');
});
