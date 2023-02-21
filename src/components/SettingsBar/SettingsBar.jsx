import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styles from './SettingsBar.module.css';

const SettingsBar = ({ settings }) => {
  // const defaultLength = 5;
  // const defaultGuesses = 6;
  // console.log('settings:')
  // console.log(settings)
  const { defaultLength, setLength, defaultGuesses, setGuesses, resetGame } =
    settings;

  const wordLengths = [4, 5, 6, 7, 8, 9, 10, 11];
  const guessRange = getRangeArray(3, 10);
  // potato += 1;
  // const cow = potato + 3;

  // console.log('cow total', cow);
  return (
    <>
      <Form className={styles.settingsContainer}>
        <Form.Select
          className={styles.formSelect}
          // size="lg"
          defaultValue={settings.defaultLength}
          onChange={(e) => settings.setLength(() => Number(e.target.value))}
        >
          {/* <option>Word Length</option> */}
          {wordLengths.map((len) => (
            <option key={len} value={len}>
              {len} letters
            </option>
          ))}
        </Form.Select>
        <div className={styles.spacer} disabled>x</div>
        <Form.Select
         className={styles.formSelect}
          // className="form-select"
          size="sm"
          defaultValue={settings.defaultGuesses}
          onChange={(e) => settings.setGuesses(() => Number(e.target.value))}
        >
          {/* <option>guesses</option> */}
          {guessRange.map((len) => (
            <option key={len} value={len}>
              {len} guesses
            </option>
          ))}
        </Form.Select>
        <Button className={styles.btn} variant="outline-dark" onClick={() => settings.resetGame()}>
          Update
        </Button>
      </Form>
    </>
  );
};

export default SettingsBar;

function getRangeArray(low, high) {
  const rangeArray = [];
  for (let i = low; i <= high; i++) {
    rangeArray.push(i);
  }
  return rangeArray;
}
// let potato = 100;

// export { potato };
