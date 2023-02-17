import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styles from './SettingsBar.module.css';

const SettingsBar = ({
  defaultLength,
  setLength,
  defaultGuesses,
  setGuesses,
  resetGame,
}) => {
  // const defaultLength = 5;
  // const defaultGuesses = 6;

  const wordLengths = [4, 5, 6, 7, 8, 9, 10, 11];
  const guessRange = getRangeArray(3, 10);

  return (
    <>
      <Form className={`${styles.settingsContainer} desktop-only`}>
        <Form.Select
          size="sm"
          defaultValue={defaultLength}
          onChange={(e) => setLength(() => Number(e.target.value))}
        >
          {/* <option>Word Length</option> */}
          {wordLengths.map((len) => (
            <option key={len} value={len}>
              {len} letters
            </option>
          ))}
        </Form.Select>
        {` x `}
        <Form.Select
          size="sm"
          defaultValue={defaultGuesses}
          onChange={(e) => setGuesses(() => Number(e.target.value))}
        >
          {/* <option>guesses</option> */}
          {guessRange.map((len) => (
            <option key={len} value={len}>
              {len} guesses
            </option>
          ))}
        </Form.Select>
        <Button className={styles.btn} onClick={() => resetGame()}>
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
