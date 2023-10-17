/* eslint-disable testing-library/no-unnecessary-act */
import '@testing-library/jest-dom';
import each from 'jest-each';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsBar from '..';
import gameUpdateHandler from '../../../utils/gameUpdateHandler';

const dispatchMock = jest.fn();
jest.mock('../../../utils/gameUpdateHandler');

const wordLength = 5;
const guesses = 6;
const defaultState = { wordLength, guesses };

let letterDropdown;
let separator;
let guessDropdown;
let updateButton;

async function setup() {
  render(<SettingsBar state={defaultState} dispatch={dispatchMock} />);

  letterDropdown = screen.getAllByRole('combobox')[0];
  separator = screen.getByText('x');
  guessDropdown = screen.getAllByRole('combobox')[1];
  updateButton = screen.getByText('Update');
}

beforeEach(() => {
  setup();
});

afterEach(cleanup);

const letterCountPrefixes = [4, 5, 6, 7, 8, 9, 10, 11];
const guessCountPrefixes = [3, 4, 5, 6, 7, 8, 9, 10];

describe('SettingsBar test suite', () => {
  it('displays main elements and defaults', () => {
    expect(letterDropdown).toBeVisible();
    expect(separator).toBeVisible();
    expect(guessDropdown).toBeVisible();
    expect(updateButton).toBeVisible();
  });

  describe('letter picker...', () => {
    each(letterCountPrefixes).it('displays "%s letters" option', (count) => {
      act(() => {
        userEvent.selectOptions(
          letterDropdown,
          screen.getByRole('option', { name: `${count} letters` })
        );
        expect(
          screen.getByRole('option', { name: `${count} letters` }).selected
        ).toBe(true);
      });
    });
  });

  describe('guess picker...', () => {
    each(guessCountPrefixes).it('displays "%s guesses" option', (count) => {
      act(() => {
        userEvent.selectOptions(
          guessDropdown,
          screen.getByRole('option', { name: `${count} guesses` })
        );
        expect(
          screen.getByRole('option', { name: `${count} guesses` }).selected
        ).toBe(true);
      });
    });
  });

  describe('Update button...', () => {
    it('returns updated values when values are left at default', () => {
      userEvent.click(updateButton);

      expect(gameUpdateHandler).toHaveBeenCalledWith(
        defaultState,
        dispatchMock,
        defaultState
      );
    });

    each(letterCountPrefixes).it(
      'returns updated values when letter count is updated',
      (count) => {
        act(() => {
          userEvent.selectOptions(
            letterDropdown,
            screen.getByRole('option', { name: `${count} letters` })
          );
        });

        const modifiedState = { ...defaultState, wordLength: count };
        userEvent.click(updateButton);

        expect(gameUpdateHandler).toHaveBeenCalledWith(
          defaultState,
          dispatchMock,
          modifiedState
        );
      }
    );

    each(guessCountPrefixes).it(
      'returns updated values when guesss value is updated',
      (count) => {
        act(() => {
          userEvent.selectOptions(
            guessDropdown,
            screen.getByRole('option', { name: `${count} guesses` })
          );
        });

        const modifiedState = { ...defaultState, guesses: count };
        userEvent.click(updateButton);

        expect(gameUpdateHandler).toHaveBeenCalledWith(
          defaultState,
          dispatchMock,
          modifiedState
        );
      }
    );
  });

  describe('settings bar', () => {});
});
