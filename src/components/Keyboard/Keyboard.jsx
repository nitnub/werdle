import { useEffect, useState } from 'react';
import { action } from '../../context/game.actions';


export default function Keyboard({ state, dispatch, keyEvent }) {
  const keyLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Del'],
  ];

  const allowableKeys = [...Array(26)].map((elem, index) =>
    String.fromCharCode(index + 97)
  );
  
  const letters = [...Array(26)].map((elem, index) =>
    String.fromCharCode(index + 97)
  );

  allowableKeys.push('enter', 'backspace');

  useEffect(() => {
    const physicalKeyEvent = (e) => {
      if (state.gameOver) return;
      
      const guess = e.key.toLowerCase();
      if (letters.includes(guess))
        dispatch({ type: action.keyEventLetter, payload: guess });
      if (guess === 'backspace')
        dispatch({ type: action.keyEventDelete, payload: guess });
      if (guess === 'enter') dispatch({ type: action.endTurn, payload: guess });
    };

    window.addEventListener('keydown', physicalKeyEvent);
    return () => window.removeEventListener('keydown', physicalKeyEvent);
  });

  const clickHandler = (e) => {
    if (state.gameOver) return;
    const pressedKey = e.target.innerText.toLowerCase();

    if (letters.includes(pressedKey))
      dispatch({ type: action.keyEventLetter, payload: pressedKey });
    if (pressedKey === 'del')
      dispatch({ type: action.keyEventDelete, payload: pressedKey });
    if (pressedKey === 'enter') dispatch({ type: action.endTurn, payload: pressedKey });
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard">
        {keyLayout.map((row) => {
          return (
            <div key={row[0]} className="keyboard-row">
              {row.map((key) => (
                <div
                  key={key}
                  className={`keyboard-key ${key.toLowerCase()} ${
                    // keyColors[key]
                    state.keyColors[key]
                  }`}
                  onClick={clickHandler}
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
