import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Keyboard from '..';

async function setup() {
  render(<Keyboard />);
}

// beforeEach(() => {
//   setup();
// });

const dispatchMock = jest.fn();

describe('Keyboard test suite', () => {

  describe('keyboard', () => {
    it.todo('displays all keys');
    it.todo('adds letters to board');
    it.todo('deletes letters from board');
    it.todo('checks word');
    it.todo('shows winning modal with correct guess');
    it.todo('shows losing modal with losing game board is submitted');
  });
});
