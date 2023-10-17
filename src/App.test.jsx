import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Header from './components/Header';
import resetHandler from './utils/resetHandler';

const dispatchMock = jest.fn();

jest.mock('./utils/resetHandler');

async function setup() {
  render(<App />);
}

beforeEach(() => {
  setup();
});

afterEach(cleanup);
describe('App test suite', () => {
  describe('renders...', () => {
    it('header', async () => {
      // const header = container.getElementsByClassName('header');
      const key = screen.getByText('Enter');
      const header = screen.getByTestId('header');

      // const gameOverModal = screen.getByTestId('game-over'); // click to display
      const settingsBar = screen.getByTestId('settings-bar');
      const gameBoard = screen.getByTestId('game-board');
      const keyboard = screen.getByTestId('keyboard');

      expect(header).toBeVisible();
      expect(header).toHaveTextContent('Werdle!');
      expect(settingsBar).toBeVisible();
      expect(gameBoard).toBeVisible();
      expect(keyboard).toBeVisible();

      // console.log(screen)
    });

    it.todo('settings bar');
    it.todo('game board');
    it.todo('keyboard');
  });



  describe('settings', () => {
    it.todo('displays all letter options (4-11)');
    it.todo('displays all guess options (3-10)');
    it.todo('updates board when letter count is updated');
    it.todo('updates board when guesss value is updated');
  });

  describe('settings bar', () => {});

  describe('game board', () => {
    it.todo('displays a valid starting grid');
  });


});
