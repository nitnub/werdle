import { useEffect } from 'react';
import { KeyboardService } from './Keyboard.service';

export default function Keyboard({ state, dispatch }) {
  const { getLayout, keyPressHandler, keyClickHandler } = new KeyboardService(
    state,
    dispatch
  );

  useEffect(() => {
    const physicalKeyEvent = (e) => {
      keyPressHandler(e);
    };

    window.addEventListener('keydown', physicalKeyEvent);
    return () => window.removeEventListener('keydown', physicalKeyEvent);
  });

  return (
    <div data-testid="keyboard" className="keyboard-container">
      <div className="keyboard">
        {getLayout().map((row) => {
          return (
            <div key={row[0]} className="keyboard-row">
              {row.map((key) => (
                <div
                  key={key}
                  className={`keyboard-key ${key.toLowerCase()} ${
                    state.keyColors[key]
                  }`}
                  onClick={keyClickHandler}
                >
                  {key}
                </div>
              ))}{' '}
            </div>
          );
        })}
      </div>
    </div>
  );
}
