import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Header from '..';
import resetHandler from '../../../utils/resetHandler';

jest.mock('../../../utils/resetHandler');

const dispatchMock = jest.fn();
const defaultState = {
  wordLength: 6,
  guesses: 7,
};

async function setup() {
  render(<Header state={defaultState} dispatch={dispatchMock} />);
}

beforeEach(() => {
  setup();
});

afterEach(cleanup);

describe('header test suite', () => {
  it('fires a word reset when title is clicked', () => {
    const title = screen.getByLabelText('title');
    fireEvent.click(title);

    expect(resetHandler).toHaveBeenCalled();
  });

  describe('LinkedIn link...', () => {
    it('points to correct URL', async () => {
      const links = screen.getAllByRole('link');
      const linkedInLink = links[0];

      expect(linkedInLink).toHaveAttribute(
        'href',
        'https://linkedin.com/in/nick-bryant-6b1a9579'
      );
    });

    it('has correct tool tip', () => {
      const links = screen.getAllByRole('link');
      const linkedInLink = links[0];

      expect(linkedInLink).toHaveAttribute('title', 'Visit me on LinkedIn');
    });
  });

  describe('GitHub link...', () => {
    it('points to correct URL', async () => {
      const links = screen.getAllByRole('link');
      const gitHubLink = links[1];

      expect(gitHubLink).toHaveAttribute('href', 'https://github.com/nitnub');
    });

    it('has correct tool tip', () => {
      const links = screen.getAllByRole('link');
      const gitHubLink = links[1];

      expect(gitHubLink).toHaveAttribute('title', 'Visit my Github');
    });
  });
});
