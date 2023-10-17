import '@testing-library/jest-dom';
import each from 'jest-each';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsBar from '..';

const dispatchMock = jest.fn();
const defaultState = {
  wordLength: 6,
  guesses: 7,
};

async function setup() {
  render(<SettingsBar state={defaultState} dispatch={dispatchMock} />);
}

beforeEach(() => {
  setup();
});

afterEach(cleanup);

const letterCountPrefixes = ['4', '5', '6', '7', '8', '9', '10', '11'];
const guessCountPrefixes = ['3', '4', '5', '6', '7', '8', '9', '10'];

describe('SettingsBar test suite', () => {
  describe('letter picker...', () => {
    each(letterCountPrefixes).it('displays "%s letters" option', (count) => {
      act(() => {
        userEvent.selectOptions(
          screen.getAllByRole('combobox')[0],
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
          screen.getAllByRole('combobox')[1],
          screen.getByRole('option', { name: `${count} guesses` })
        );
        expect(
          screen.getByRole('option', { name: `${count} guesses` }).selected
        ).toBe(true);
      });
    });
  });

  describe('settings', () => {
    it.todo('displays the three elements and "x" separator');
    it.todo('returns updated values when letter count is updated');
    it.todo('returns updated values when guesss value is updated');
  });

  describe('settings bar', () => {});
});
