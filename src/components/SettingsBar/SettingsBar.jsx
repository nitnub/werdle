import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styles from './SettingsBar.module.css';
// import { action } from './context/game.reducer';
import { action } from '../../context/game.actions';
import getWordOfLength from '../../utils/getWordOfLength';

export default function SettingsBar({ state, dispatch }) {
  const wordLengths = [4, 5, 6, 7, 8, 9, 10, 11];
  const guessRange = getRangeArray(3, 10);
  const [tempValues, setTempValues] = useState({
    wordLength: state.wordLength,
    guesses: state.guesses,
  });

  const settingsHandler = async () => {
    const newWord = await getWordOfLength(state.wordLength);
    const payload = { ...tempValues, newWord };

    dispatch({ type: action.resetGame, payload });
  };

  return (
    <>
      <Form className={styles.settingsContainer}>
        <Form.Select
          className={styles.formSelect}
          defaultValue={state.wordLength}
          onChange={(e) =>
            setTempValues({ ...tempValues, wordLength: Number(e.target.value) })
          }
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
          defaultValue={state.guesses}
          onChange={(e) =>
            setTempValues({ ...tempValues, guesses: Number(e.target.value) })
          }
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
          onClick={settingsHandler}
        >
          Update
        </Button>
      </Form>
    </>
  );
}

function getRangeArray(low, high) {
  const rangeArray = [];
  for (let i = low; i <= high; i++) {
    rangeArray.push(i);
  }
  return rangeArray;
}
