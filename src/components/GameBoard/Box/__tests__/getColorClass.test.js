import '@testing-library/jest-dom';
import each from 'jest-each';
import getColorClass from '../getColorClass';

const correctCases = [
  ['V', 'VALID', 0],
  ['A', 'VALID', 1],
  ['L', 'VALID', 2],
  ['I', 'VALID', 3],
  ['D', 'VALID', 4],
  ['Y', 'ELEMENTARY', 9],
];

const closeCases = [
  ['V', 'VALID', 1],
  ['A', 'VALID', 4],
  ['L', 'VALID', 0],
  ['I', 'VALID', 2],
  ['D', 'VALID', 3],
  ['Y', 'ELEMENTARY', 0],
];

const incorrectCases = [
  ['M', 'VALID', 1],
  ['.', 'VALID', 4],
  ['Z', 'VALID', 0],
  [2, 'VALID', 1],
  ['DB', 'VALID', 3],
  ['*', 'ELEMENTARY', 5],
];

describe('getColorClas test suite', () => {
  each(correctCases).it(
    "returns 'correct' for %s at %s[%i]",
    (letter, solution, index) => {
      expect(getColorClass(letter, index, solution)).toBe('correct');
    }
  );

  each(closeCases).it(
    "returns 'close' for %s at %s[%i]",
    (letter, solution, index) => {
      expect(getColorClass(letter, index, solution)).toBe('close');
    }
  );

  each(incorrectCases).it(
    "returns 'incorrect' for %s at %s[%i]",
    (letter, solution, index) => {
      expect(getColorClass(letter, index, solution)).toBe('incorrect');
    }
  );
});
