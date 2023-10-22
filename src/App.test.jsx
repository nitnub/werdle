/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
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

// import * as mockGameOverState from './context/defaultState';
// import defaultState from './context/defaultState';
import mockState from './context/defaultState';
// import defaultState from './context/defaultState';
import { isCompositeComponent } from 'react-dom/test-utils';
import getWordOfLength from './utils/getWordOfLength';
// const dispatchMock = jest.fn();

jest.mock('./utils/getWordOfLength');
jest.mock('./utils/resetHandler');
jest.mock('./context/defaultState');

const winningOutcome = 1;
const losingOutcome = 2;

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
let gameOverModal;
let modalCloseButton;
let solution;
async function setup() {
  render(<App />);

  settingsBarMain = await screen.findByTestId('settings-bar-main');
  settingsBarHeader = await screen.findByTestId('settings-bar-header');

  gameBoard = await screen.findByTestId('game-board');
  keyboard = await screen.findByTestId('keyboard');
  gameRows = await screen.findAllByTestId('game-row');
  header = await screen.findByTestId('app-header');

  letterDropdownMain = (
    await within(settingsBarMain).findAllByRole('combobox')
  )[0];
  guessDropdownMain = (
    await within(settingsBarMain).findAllByRole('combobox')
  )[1];
  updateButtonMain = await within(settingsBarMain).findByText('Update');

  // updateButton = screen.findByText('Update');

  // letterDropdownHeader = await within(header).findAllByRole('combobox')[0];
  // guessDropdownHeader = await within(header).findAllByRole('combobox')[1];
  // updateButtonHeader = await within(header).findByText('Update');

  linkedInIconHeader = await within(header).findByTitle('Visit me on LinkedIn');
  gitIconHeader = await within(header).findByTitle('Visit my Github');

  gameLetters = await screen.findAllByTestId('game-letter');
  // gameOverModal = screen.findByTestId('game-over');
  // gameOverModal = screen.findByTestId('game-over');
  // gameOverModal = screen.findByText('The word was...');.
}

// beforeEach(() => {
//   setup();
// });

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('App test suite', () => {
  describe('renders...', () => {
    beforeEach(() => {
      setup();
    });

    afterEach(cleanup);
    xit('header', () => {
      expect(header).toHaveTextContent('Werdle!');
    });

    xit('settings', () => {
      expect(letterDropdownMain).toBeVisible();
      expect(guessDropdownMain).toBeVisible();

      expect(updateButtonMain).toBeVisible();
    });

    xit('game board', () => {
      expect(gameBoard).toBeVisible();
    });

    xit('keyboard', () => {
      expect(keyboard).toBeVisible();
    });
  });

  // describe('settingsHeader', () => {
  //   it.todo('updates board when letter count is updated');
  //   it.todo('updates board when guesss value is updated');
  // });

  describe('game board', () => {
    beforeEach(() => {
      setup();
    });

    // afterEach(cleanup);

    xit('changes board when user updates game settings', async () => {
      const guessCount = 8;
      const letterCount = 7;
      mockState.gameOverTest = true;
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

      act(() => {
        userEvent.click(updateButtonMain);
      });
      expect(updateButtonMain).toHaveTextContent('Update');

      let updatedGameRows = screen.getAllByTestId('game-row');

      let lettersInWordOne = await within(updatedGameRows[0]).findAllByTestId(
        'game-letter'
      );
    });
    it.todo('displays a valid starting grid');
    it.todo('updates board with valid key presses');
    it.todo('progresses to next round with Enter on final letter guess');
  });

  describe('game over modal', () => {
    async function modalSetup(outcome) {
      solution = 'VALID';
      mockState.gameOver = true;
      mockState.modalVisible = true;
      mockState.solution = solution;
      mockState.outcome = outcome;
      render(<App />);
    }

    it('displays winner modal with winning submission', async () => {
      modalSetup(winningOutcome);

      const winningHeader = await screen.findByText('You won!');
      const goMessage = await screen.findByText('The word was...');
      const goSolution = await screen.findByText(solution);
      const goCloseButton = await screen.findByText('Close');

      expect(winningHeader).toBeVisible();
      expect(goMessage).toBeVisible();
      expect(goSolution).toBeVisible();
      expect(goCloseButton).toBeVisible();
    });

    it('displays losing modal with losing submission', async () => {
      modalSetup(losingOutcome);

      const losingHeader = await screen.findByText('Almost!');
      const goMessage = await screen.findByText('The word was...');
      const goSolution = await screen.findByText(solution);
      const goCloseButton = await screen.findByText('Close');

      expect(losingHeader).toBeVisible();
      expect(goMessage).toBeVisible();
      expect(goSolution).toBeVisible();
      expect(goCloseButton).toBeVisible();
    });
    it("hides the outcome modal when 'Close' is clicked", async () => {
      modalSetup(losingOutcome);

      const goMessage = await screen.findByText('The word was...');
      const goCloseButton = await screen.findByText('Close');

      expect(goMessage).toBeVisible();

      act(() => {
        userEvent.click(goCloseButton);
      });
      expect(goMessage).not.toBeVisible();
    });

    it.todo('displays loser modal on losing board');
  });
});
