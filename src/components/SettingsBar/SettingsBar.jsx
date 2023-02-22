import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styles from './SettingsBar.module.css';

export default function SettingsBar({ settings }) {
  const { defaultLength, setLength, defaultGuesses, setGuesses, resetGame } =
    settings;

  const wordLengths = [4, 5, 6, 7, 8, 9, 10, 11];
  const guessRange = getRangeArray(3, 10);

  return (
    <>
      <Form className={styles.settingsContainer}>
        <Form.Select
          className={styles.formSelect}
          defaultValue={defaultLength}
          onChange={(e) => setLength(() => Number(e.target.value))}
        >
          {wordLengths.map((len) => (
            <option key={len} value={len}>
              {len} letters
            </option>
          ))}
        </Form.Select>
        <div className={styles.spacer} disabled>
          x
        </div>
        <Form.Select
          className={styles.formSelect}
          size="sm"
          defaultValue={defaultGuesses}
          onChange={(e) => setGuesses(() => Number(e.target.value))}
        >
          {guessRange.map((len) => (
            <option key={len} value={len}>
              {len} guesses
            </option>
          ))}
        </Form.Select>
        <Button
          className={styles.btn}
          variant="outline-dark"
          onClick={() => resetGame()}
        >
          Update
        </Button>
      </Form>
    </>
  );
};

function getRangeArray(low, high) {
  const rangeArray = [];
  for (let i = low; i <= high; i++) {
    rangeArray.push(i);
  }
  return rangeArray;
}
