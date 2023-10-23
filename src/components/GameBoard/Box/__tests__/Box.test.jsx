import '@testing-library/jest-dom';

import { cleanup, render, screen } from '@testing-library/react';
import defaultState from '../../../../context/defaultState';
import Box from '../Box';

const getColorClass = jest.requireActual('../getColorClass');
const getColorSpy = jest.spyOn(getColorClass, 'default');

let letter;

function renderBox(roundOver) {
  defaultState.solution = 'VALID';
  letter = 'A';
  const index = 1;

  render(
    <Box
      key={`b${index}`}
      index={index}
      state={defaultState}
      letter={letter}
      boxHeight={26}
      thisRoundIsOver={roundOver}
    />
  );
}

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('Box test suite', () => {
  it('calls the getColorClass on end of round', () => {
    renderBox(true);
    expect(getColorSpy).toHaveBeenCalledTimes(1);
    expect(getColorSpy).toHaveBeenCalledWith('A', 1, 'VALID');
  });

  it('displays the letter for the given index', () => {
    renderBox(true);
    expect(screen.getByText(letter)).toBeVisible();
  });

  it('does not update color when round is not changing', () => {
    renderBox(false);
    expect(getColorSpy).not.toHaveBeenCalled();
  });
});
