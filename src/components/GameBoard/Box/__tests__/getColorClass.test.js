import '@testing-library/jest-dom';

import { cleanup, render } from '@testing-library/react';
import defaultState from '../../../../context/defaultState';
import getColorClass from '../getColorClass';

// const getColorClass = jest.requireActual('../getColorClass');
// const getColorSpy = jest.spyOn(getColorClass, 'default');

let sut;

// function renderBox(roundOver) {
//   defaultState.solution = 'VALID';
//   letter = 'A';
//   const index = 1;

//   render(
//     <Box
//       key={`b${index}`}
//       index={index}
//       state={defaultState}
//       letter={letter}
//       boxHeight={26}
//       thisRoundIsOver={roundOver}
//     />
//   );
// }

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

let solution = 'VALID';
let letter = 'A';
let index;

describe('getColorClas test suite', () => {
  it("returns 'correct' on correct letter placement", () => {
    index = 1;

    expect(getColorClass(letter, index, solution)).toBe('correct');
  });

  it("returns 'close' when letter is elsewhere in the word", () => {
    index = 3;

    expect(getColorClass(letter, index, solution)).toBe('close');
  });

  it("returns 'incorrect' when letter is not in the word", () => {
    letter = 'Q';
    index = 2;

    expect(getColorClass(letter, index, solution)).toBe('incorrect');
  });
});
