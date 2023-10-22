import '@testing-library/jest-dom';

import { cleanup, render } from '@testing-library/react';

import Box from '../Box';

function setup() {
  render(<Box />);
}

beforeEach(() => {
  setup();
});

afterEach(cleanup);
describe('Box test suite', () => {
  it.todo("returns 'correct' on correct letter guess");
  it.todo("returns 'close' on close letter guess");
  it.todo("returns 'incorrect' on incorrect letter guess");
});
