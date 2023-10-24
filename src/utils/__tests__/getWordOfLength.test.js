import '@testing-library/jest-dom';
import getWordOfLength from '../getWordOfLength';
import each from 'jest-each';

const wordListMock = {
  3: { wordLength: 3, wordCount: 2, data: ['hew'] },
  4: {
    wordLength: 4,
    wordCount: 3,
    data: ['rash', 'rash', 'rash'],
  },

  5: {
    wordLength: 5,
    wordCount: 1,
    data: ['fuzzy'],
  },

  8: {
    wordLength: 8,
    wordCount: 1,
    data: ['truncate'],
  },

  11: {
    wordLength: 11,
    wordCount: 1,
    data: ['trepidation'],
  },

  13: {
    wordLength: 13,
    wordCount: 1,
    data: ['perspicacious'],
  },
};

global.fetch = () =>
  Promise.resolve({ json: () => Promise.resolve(wordListMock) });

describe('getWordOfLength test suite', () => {
  each([
    [4, 'RASH'],
    [5, 'FUZZY'],
    [11, 'TREPIDATION'],
  ]).it('returns word of proper length [%i]', async (length, expected) => {
    const newWord = await getWordOfLength(length);

    expect(newWord).toBe(expected);
    expect(newWord.length).toBe(length);
  });
});
