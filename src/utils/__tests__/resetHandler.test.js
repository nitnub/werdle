import resetHandler from '../resetHandler';
import defaultState from '../../context/defaultState';

jest.mock('../getWordOfLength', () => ({
  __esModule: true,
  default: () => 'VALID',
}));

const dispatchMock = jest.fn();

describe('resetHanler test suite', () => {
  it('dispatches the reset payload with updated length', async () => {
    const mockState = {
      ...defaultState,
    };
    await resetHandler(mockState, dispatchMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(
      expect.objectContaining({
        type: 'RESET_GAME',
        payload: expect.objectContaining({ wordLength: 5 }),
      })
    );
  });
});
