/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom';
import { KeyboardService } from '../Keyboard.service';

const dispatchMock = jest.fn();

const testState = {
  keyColors: {},
  gameOver: false,
};

describe('Keyboard.service test suite', () => {
  let sut;
  let dispatchSpy;

  beforeEach(() => {
    sut = new KeyboardService(testState, dispatchMock);
    dispatchSpy = jest.spyOn(sut, 'dispatch');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('UI click event', () => {
    it('dispatches valid letter entry', () => {
      const event = {
        target: {
          innerText: 'A',
        },
      };

      const expectedDispatch = {
        type: 'KEY_EVENT_LETTER',
        payload: 'a',
      };

      sut.keyClickHandler(event);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(expectedDispatch);
    });

    it('dispatches Enter action', () => {
      const event = {
        target: {
          innerText: 'Enter',
        },
      };

      const expectedDispatch = { type: 'END_TURN' };

      sut.keyClickHandler(event);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(expectedDispatch);
    });

    it('dispatches Delete action', () => {
      const event = {
        target: {
          innerText: 'Del',
        },
      };

      const expectedDispatch = { type: 'KEY_EVENT_DELETE' };

      sut.keyClickHandler(event);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(expectedDispatch);
    });
  });

  describe('Keyboard input event', () => {
    it('dispatches valid letter entry', () => {
      const event = {
        key: 'M',
      };

      const expectedDispatch = {
        type: 'KEY_EVENT_LETTER',
        payload: 'm',
      };

      sut.keyPressHandler(event);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(expectedDispatch);
    });

    it('dispatches Enter action', () => {
      const event = { key: 'Enter' };

      const expectedDispatch = { type: 'END_TURN' };

      sut.keyPressHandler(event);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(expectedDispatch);
    });

    it('dispatches Backspace action', () => {
      const event = { key: 'Backspace' };

      const expectedDispatch = { type: 'KEY_EVENT_DELETE' };

      sut.keyPressHandler(event);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(expectedDispatch);
    });
  });
});
