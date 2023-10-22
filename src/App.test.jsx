/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import '@testing-library/jest-dom';
import { act, cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import mockState from './context/defaultState';

jest.mock('./utils/getWordOfLength');
jest.mock('./utils/resetHandler');
jest.mock('./context/defaultState');

mockState.board = [
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' '],
];

const winningOutcome = 1;
const losingOutcome = 2;

const lengthDefault = 5;
const guessDefault = 6;

let solution;
let goMessage;
let goCloseButton;

let header;
let linkedInIcon;
let gitIcon;

async function setup() {
  render(<App />);

  header = await screen.findByTestId('app-header');

}

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('App test suite', () => {
  describe('renders...', () => {
    beforeEach(async () => {
      setup();
    });

    it('header', async () => {

      const linkedInIcon = within(header).getByTitle('Visit me on LinkedIn');
      const gitIcon = within(header).getByTitle('Visit my Github');

      expect(gitIcon).toBeVisible();
      expect(linkedInIcon).toBeVisible();
      expect(header).toHaveTextContent('Werdle!');
    });

    it('settings', async () => {
      const settingsBar = await screen.findByTestId('settings-bar-main');
      const updateButton = await within(settingsBar).findByText('Update');

      const dropdowns = await within(settingsBar).findAllByRole('combobox');
      const [letterDropdown, guessDropDown] = dropdowns;

      expect(letterDropdown).toBeVisible();
      expect(guessDropDown).toBeVisible();
      expect(updateButton).toBeVisible();
    });

    it('game board', async () => {
      const gameBoard = await screen.findByTestId('game-board');

      expect(gameBoard).toBeVisible();
    });

    it('keyboard', async () => {
      const keyboard = await screen.findByTestId('keyboard');

      expect(keyboard).toBeVisible();
    });
  });

  describe('game board', () => {
    beforeEach(() => {
      setup();
    });

    it('displays a valid starting grid', async () => {
      const gameRows = await screen.findAllByTestId('game-row');
      const gameLetters = await screen.findAllByTestId('game-letter');

      expect(gameRows).toHaveLength(guessDefault);
      expect(gameLetters).toHaveLength(lengthDefault * guessDefault);
    });
  });

  describe('game over modal', () => {
    async function modalSetup(outcome) {
      solution = 'VALID';
      mockState.gameOver = true;
      mockState.modalVisible = true;
      mockState.solution = solution;
      mockState.outcome = outcome;
      mockState.roundOver = true;

      render(<App />);

      goMessage = await screen.findByText('The word was...');
      goCloseButton = await screen.findByText('Close');
    }

    it('displays winner modal with winning submission', async () => {
      modalSetup(winningOutcome);

      const winningHeader = await screen.findByText('You won!');
      const goSolution = await screen.findByText(solution);

      expect(winningHeader).toBeVisible();
      expect(goMessage).toBeVisible();
      expect(goSolution).toBeVisible();
      expect(goCloseButton).toBeVisible();
    });

    it('displays losing modal with losing submission', async () => {
      modalSetup(losingOutcome);

      const losingHeader = await screen.findByText('Almost!');
      const goSolution = await screen.findByText(solution);

      expect(losingHeader).toBeVisible();
      expect(goMessage).toBeVisible();
      expect(goSolution).toBeVisible();
      expect(goCloseButton).toBeVisible();
    });

    it("hides when 'Close' is clicked", async () => {
      modalSetup(losingOutcome);

      const goMessage = await screen.findByText('The word was...');
      const goCloseButton = await screen.findByText('Close');

      expect(goMessage).toBeVisible();

      act(() => {
        userEvent.click(goCloseButton);
      });

      expect(goMessage).not.toBeVisible();
    });
  });
});
