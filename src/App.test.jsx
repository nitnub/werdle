/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import '@testing-library/jest-dom';
import { act, cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import mockState from './context/defaultState';
import { beforeEach } from 'node:test';

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

let gameBoard;
let keyboard;
let gameRows;
let gameLetters;
let updateButtonMain;

let header;
let settingsBar;

let letterDropdown;
let guessDropdownMain;

let linkedInIcon;
let gitIcon;

let solution;

let goMessage;

let goCloseButton;

async function setup() {
  render(<App />);

  settingsBar = await screen.findByTestId('settings-bar-main');

  gameBoard = await screen.findByTestId('game-board');
  keyboard = await screen.findByTestId('keyboard');
  gameRows = await screen.findAllByTestId('game-row');
  header = await screen.findByTestId('app-header');

  letterDropdown = (await within(settingsBar).findAllByRole('combobox'))[0];
  // const guessDropdownMain = (await within(settingsBar).findAllByRole('combobox'))[1];
  updateButtonMain = await within(settingsBar).findByText('Update');

  gameLetters = await screen.findAllByTestId('game-letter');
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

    it('header', () => {
      linkedInIcon = within(header).getByTitle('Visit me on LinkedIn');
      gitIcon = within(header).getByTitle('Visit my Github');
      expect(gitIcon).toBeVisible();
      expect(linkedInIcon).toBeVisible();
      expect(header).toHaveTextContent('Werdle!');
    });

    it('settings', async () => {
      const guessDropdownMain = (await within(settingsBar).findAllByRole('combobox'))[1];

      expect(letterDropdown).toBeVisible();
      expect(guessDropdownMain).toBeVisible();
      expect(updateButtonMain).toBeVisible();
    });

    it('game board', () => {
      expect(gameBoard).toBeVisible();
    });

    it('keyboard', async () => {
      expect(keyboard).toBeVisible();
    });
  });

  describe('game board', () => {
    beforeEach(async () => {
      await setup();
    });

    it('displays a valid starting grid', () => {
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
