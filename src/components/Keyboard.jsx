import { useEffect, useState } from 'react';
// const defaultKeyColors = {};

const Keyboard = ({ keyColors, keyEvent }) => {
  const keyLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Del'],
  ];

  // const allowableKeys = [...Array(26)]
  const allowableKeys = [...Array(26)].map((elem, index) =>
    String.fromCharCode(index + 97)
  );
  // .forEach((letter) => (defaultKeyColors[letter] = 'unselected'));
  allowableKeys.push('Enter');
  allowableKeys.push('Backspace');
  // console.log(allowableKeys);

  // Listen for physical key press
  useEffect(() => {
    const physicalKeyEvent = (e) => {
      console.log('key is', e.key.toUpperCase());
      if (allowableKeys.includes(e.key)) {
        // keyEvent(e.key.toUpperCase());
        keyEvent(e.key);
      }
    };
    // TODO: might be able to remove avove check for inclusion in allowable keys list

    window.addEventListener('keydown', physicalKeyEvent);
    return () => window.removeEventListener('keydown', physicalKeyEvent);
  });

  const clickHandler = (e) => {
    keyEvent(e.target.innerText);
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

export default Keyboard;
