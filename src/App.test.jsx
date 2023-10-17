import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Header from './components/Header';
import resetHandler from './utils/resetHandler';

const dispatchMock = jest.fn();

jest.mock('./utils/resetHandler');

async function setup() {
  render(<App />);
}

describe('App test suite', () => {
  describe('renders...', () => {
    beforeEach(() => {
      setup();
    });
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

  describe('header', () => {
    // shows buttons
    // shows conditional settings?
    // click to refresh
    it('header test', () => {


      const state = {
        wordLength: 6,
        guesses: 7,
      };
      render(<Header state={state} dispatch={dispatchMock} />);

      const button = screen.getByText('Werdle!');
      const title = screen.getByLabelText('title');

      fireEvent.click(title);

      expect(resetHandler).toHaveBeenCalled();
    });
  });

  describe('settings bar', () => {});
  describe('game board', () => {});
  describe('keyboard', () => {});
});
