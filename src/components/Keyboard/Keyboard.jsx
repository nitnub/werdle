import { useEffect, useState } from 'react';
// const defaultKeyColors = {};
// import { action } from '../../context/gameStateReducer';

export const action = {
  resetGame: 'RESET_GAME',
  getNewSolution: 'GET_NEW_SOLUTION',
  checkGameOver: 'CHECK_GAME_OVER',
  updateSameRound: 'UPDATE_SAME_ROUND',
  updateRoundOver: 'UPDATE_ROUND_OVER',
  // keyEventEnter: 'KEY_EVENT_ENTER',
  keyEventDelete: 'KEY_EVENT_DELETE',
  keyEventLetter: 'KEY_EVENT_LETTER',
  endTurn: 'END_TURN',
  updateKeyColors: 'UPDATE_KEY_COLORS',
};


export default function Keyboard({ state, dispatch, keyColors, keyEvent }) {
  const keyLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Del'],
  ];

  // const allowableKeys = [...Array(26)]
  const allowableKeys = [...Array(26)].map((elem, index) =>
    String.fromCharCode(index + 97)
  );
  const letters = [...Array(26)].map((elem, index) =>
    String.fromCharCode(index + 97)
  );
  // .forEach((letter) => (defaultKeyColors[letter] = 'unselected'));
  allowableKeys.push('Enter');
  allowableKeys.push('Backspace');
  // console.log(allowableKeys);

  // Listen for physical key press
  useEffect(() => {
    const physicalKeyEvent = (e) => {
      // console.log('key is', e.key.toUpperCase());
      if (allowableKeys.includes(e.key)) {
        // keyEvent(e.key.toUpperCase());
        keyEvent(e.key);

        // FOR KEY PRESSES, action.payload = LETTER (e.key)
        
      }
      console.log(123)
      if (letters.includes(e.key)) dispatch({type: action.keyEventLetter, payload: e.key})
      if (e.key === 'Backspace' ) dispatch({type: action.keyEventDelete, payload: e.key})
      if (e.key === 'Enter' ) dispatch({type: action.endTurn, payload: e.key})
    };
    // TODO: might be able to remove avove check for inclusion in allowable keys list

    window.addEventListener('keydown', physicalKeyEvent);
    return () => window.removeEventListener('keydown', physicalKeyEvent);
  });

  const clickHandler = (e) => {
    keyEvent(e.target.innerText);

    // reducer...
    
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
                    keyColors[key]
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
};


