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
import gameUpdateHandler from './utils/gameUpdateHandler';
import { isCompositeComponent } from 'react-dom/test-utils';

const dispatchMock = jest.fn();

jest.mock('./utils/resetHandler');
const handler = {
  gameUpdateHandler,
};

const cow = jest.spyOn(handler, 'gameUpdateHandler');

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

  // console.log('button:');
  // console.log(updateButtonMain);
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
    it('keyboard', () => {
      // console.log(screen.innerHTML);
      // screen.debug(undefined, Infinity)
    });
  });

  describe('settings', () => {
    it.todo('updates board when letter count is updated');
    it.todo('updates board when guesss value is updated');
  });

  // describe('settings bar', () => {});

  describe('game board', () => {
    it.skip('changes board when user updates game settings', async () => {
      const guessCount = 8;
      const letterCount = 7;
      // confirm initial row count and word length
      expect(gameRows).toHaveLength(6);
      // console.log(gameRows[0]);

      // // update word length selection
      // // act(() => {
      // userEvent.selectOptions(
      //   guessDropdownMain,
      //   // within(guessDropdownMain).getByRole('option', {
      //   `${guessCount} guesses`
      //   // within(settingsBarMain).getByRole('option', {
      //   //   name: `${guessCount} guesses`,
      //   // })
      //   // screen.getByRole('option', { name: `${guessCount} guesses` })[1]
      // );
      // // });

      // act(() => {
      //   userEvent.selectOptions(
      //     letterDropdownMain,
      //     // screen.getByRole('option', { name: `${letterCount} letters` })[1]
      //     // within(letterDropdownMain).getByRole('option', {
      //     // `${letterCount} letters`.
      //     // screen.getAllByRole('option', {
      //     // name: `${letterCount} letters`,
      //     // })
      //     within(settingsBarMain).getByRole('option', {
      //       name: `${letterCount} letters`,
      //     })
      //   );
      // });

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

      console.log('x'.repeat(100));
      // console.log(typeof updateButtonMain);
      // console.log(guessDropdownMain);
      // console.log(letterDropdownMain);
      console.log('x'.repeat(100));
      // const modifiedState = { ...defaultState, guesses: count };
      // act(() => {
      userEvent.click(updateButtonMain);

      // userEvent.click(updateButton[1]);
      // });
      // expect(cow).toHaveBeenCalledTimes(10);
      // });
      // expect(gameUpdateHandler).toHaveBeenCalledWith(
      //   defaultState,
      //   dispatchMock,
      //   modifiedState
      // );
      expect(updateButtonMain).toHaveTextContent('Update');
      // console.log(updateButtonMain.innerHTML);
      // update guess count selection
      // click update
      // get new row count
      let updatedGameRows = screen.getAllByTestId('game-row');
      // get new word length
      // expect row counts not to match
      // expect(updatedGameRows).toHaveLength(guessCount);

      // let lettersInWordOne = await within(updatedGameRows[0]).findAllByTestId(
      console.log(`prev => `, gameRows.length);
      console.log(`${letterCount} letters`, updatedGameRows.length);
      let lettersInWordOne = await within(updatedGameRows[0]).findAllByTestId(
        'game-letter'
        );
        console.log(`Updated Letters in row 1: `, updatedGameRows.length);

      // expect(
      //   // screen.getByRole(letterDropdownMain.getByRole, `${letterCount} letters`).selected
      //   screen.getByRole('option', `${letterCount} letters`).selected
      // ).toBe(true);
      // expect(lettersInWordOne).toHaveLength(letterCount);

      // expect word lengths  not to match
    });
    it.todo('displays a valid starting grid');
    it.todo('updates board with valid key presses');
    it.todo('progresses to next round with Enter on final letter guess');
    it.todo('displays winner modal on correct guess');
    it.todo('displays loser modal on losing board');
  });
});
