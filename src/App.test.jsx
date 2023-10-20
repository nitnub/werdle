/* eslint-disable testing-library/no-unnecessary-act */
import '@testing-library/jest-dom';

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

import { isCompositeComponent } from 'react-dom/test-utils';

const dispatchMock = jest.fn();

jest.mock('./utils/resetHandler');

let settingsBar;
let guessDropdown;
let letterDropdown;
let gameBoard;
let keyboard;
let gameRows;
let gameLetters;
let updateButtonMain;
let updateButtonHeader;
let header;
let settingsBarMain;
let settingsBarHeader;
let letterDropdownMain;
let guessDropdownMain;
let letterDropdownHeader;
let guessDropdownHeader;

let gitIconMain;
let linkedInIconMain;
let gitIconHeader;
let linkedInIconHeader;
let updateButton;
async function setup() {
  render(<App />);

  settingsBarMain = screen.getByTestId('settings-bar-main');
  settingsBarHeader = screen.getByTestId('settings-bar-header');

  gameBoard = screen.getByTestId('game-board');
  keyboard = screen.getByTestId('keyboard');
  gameRows = screen.getAllByTestId('game-row');
  header = screen.getByTestId('app-header');

  letterDropdownMain = within(settingsBarMain).getAllByRole('combobox')[0];
  guessDropdownMain = within(settingsBarMain).getAllByRole('combobox')[1];
  updateButtonMain = within(settingsBarMain).getByText('Update');

  // updateButton = screen.getByText('Update');

  // letterDropdownHeader = within(header).getAllByRole('combobox')[0];
  // guessDropdownHeader = within(header).getAllByRole('combobox')[1];
  // updateButtonHeader = within(header).getByText('Update');

  linkedInIconHeader = within(header).getByTitle('Visit me on LinkedIn');
  gitIconHeader = within(header).getByTitle('Visit my Github');

  gameLetters = screen.getAllByTestId('game-letter');
}

beforeEach(() => {
  setup();
});

afterEach(cleanup);

describe('App test suite', () => {
  describe('renders...', () => {
    it.skip('header test', () => {
      expect(header).toHaveTextContent('Werdle!');

      expect(letterDropdownMain).toBeVisible();
      expect(guessDropdownMain).toBeVisible();

      expect(updateButtonMain).toBeVisible();
      expect(gameBoard).toBeVisible();
      expect(keyboard).toBeVisible();
    });

    it.todo('settings bar');
    it.todo('game board');
    it.todo('keyboard');
  });

  describe('settings', () => {
    it.todo('updates board when letter count is updated');
    it.todo('updates board when guesss value is updated');
  });

  describe('game board', () => {
    it.skip('changes board when user updates game settings', async () => {
      const guessCount = 8;
      const letterCount = 7;

      expect(gameRows).toHaveLength(6);

      act(() => {
        userEvent.selectOptions(
          letterDropdownMain,
          within(letterDropdownMain).getByRole('option', {
            name: `${letterCount} letters`,
          })
        );
      });
      expect(
        screen.getByRole('option', { name: `${letterCount} letters` }).selected
      ).toBe(true);

      userEvent.click(updateButtonMain);

      expect(updateButtonMain).toHaveTextContent('Update');

      let updatedGameRows = screen.getAllByTestId('game-row');

      let lettersInWordOne = await within(updatedGameRows[0]).findAllByTestId(
        'game-letter'
      );

    });
    it.todo('displays a valid starting grid');
    it.todo('updates board with valid key presses');
    it.todo('progresses to next round with Enter on final letter guess');
    it.todo('displays winner modal on correct guess');
    it.todo('displays loser modal on losing board');
  });
});
