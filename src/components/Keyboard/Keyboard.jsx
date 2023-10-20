import { useEffect } from 'react';
import { KeyboardService } from './Keyboard.service';

export default function Keyboard({ state, dispatch }) {
  const ks = new KeyboardService(state, dispatch);
  const keyLayout = ks.getLayout();

  useEffect(() => {
    const physicalKeyEvent = (e) => {
      ks.keyPressHandler(e);
    };

    window.addEventListener('keydown', physicalKeyEvent);
    return () => window.removeEventListener('keydown', physicalKeyEvent);
  });

  return (
    <div data-testid="keyboard" className="keyboard-container">
      <div className="keyboard">
        {keyLayout.map((row) => {
          return (
            <div key={row[0]} className="keyboard-row">
              {row.map((key) => (
                <div
                  key={key}
                  className={`keyboard-key ${key.toLowerCase()} ${
                    state.keyColors[key]
                  }`}
                  onClick={ks.keyClickHandler}
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
