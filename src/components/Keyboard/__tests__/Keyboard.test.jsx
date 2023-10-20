/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom';
import { KeyboardService } from '../Keyboard.service';

import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Keyboard from '..';
import each from 'jest-each';

const dispatchMock = jest.fn();
const keyClickHandlerSpy = jest.spyOn(
  KeyboardService.prototype,
  'keyClickHandler'
);

const keyPressHandlerSpy = jest.spyOn(
  KeyboardService.prototype,
  'keyPressHandler'
);

const testState = {
  keyColors: {},
  gameOver: false,
};

async function setup() {
  render(<Keyboard state={testState} dispatch={dispatchMock} />);
}

beforeEach(() => {
  setup();
});

afterEach(cleanup);

describe('Keyboard test suite', () => {
  describe('keyboard', () => {
    it('displays all keys', () => {
      const validLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const specialKeys = ['Del', 'Enter'];

      validLetters.split('').forEach((key) => {
        expect(screen.getByText(key)).toBeVisible();
      });

      specialKeys.forEach((key) => {
        expect(screen.getByText(key)).toBeVisible();
      });
    });
    it.todo('adds letters to board');
    it.todo('deletes letters from board');
    it.todo('checks word');
    it.todo('shows winning modal with correct guess');
    it.todo('shows losing modal with losing game board is submitted');
  });

  const uiKeyboardCases = ['A', 'B', 'Z', 'Del', 'Enter'];
  each(uiKeyboardCases).it(
    'calls the keyHandler when pressing %s on UI keyboard',
    (label) => {
      const key = screen.getByText(label);
      const testEvent = {
        target: {
          innerText: label,
        },
      };

      act(() => {
        userEvent.click(key, testEvent);
      });

      expect(keyClickHandlerSpy).toHaveBeenCalledTimes(1);
    }
  );

  const physicalKeyboardCases = ['A', 'B', 'Z'];
  each(physicalKeyboardCases).it(
    'calls the keyHandler when pressing %s on physical keyboard',
    (letter) => {
      act(() => {
        userEvent.keyboard(letter);
      });

      expect(keyPressHandlerSpy).toHaveBeenCalledTimes(1);
      expect(keyPressHandlerSpy).toHaveBeenCalledWith(
        expect.objectContaining({ key: letter })
      );
    }
  );
});
