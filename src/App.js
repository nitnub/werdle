import './App.css';
import React, { useEffect, useState } from 'react';
import Keyboard from './components/Keyboard';
import Row from './components/Row';
import GameOver from './components/GameOver';


// Word resource link
const WORD_LIST_URL = './res/words.json';
// const WORD_LIST_URL = './res/words.test.json';
const WORD_LENGTH = 5;
const NUM_OF_ROUNDS = 6;

// Create board using defined number of letters per round and rounds per game
let round = Array(WORD_LENGTH).fill(' ');
let game = [];
for (let i = 0; i < NUM_OF_ROUNDS; i++) {
  game.push([...round]);
}

// Default Key Colors

const defaultKeyColors = {
  Q: 'unselected',
  W: 'unselected',
  E: 'unselected',
  R: 'unselected',
  T: 'unselected',
  Y: 'unselected',
  U: 'unselected',
  I: 'unselected',
  O: 'unselected',
  P: 'unselected',
  A: 'unselected',
  S: 'unselected',
  D: 'unselected',
  F: 'unselected',
  G: 'unselected',
  H: 'unselected',
  J: 'unselected',
  K: 'unselected',
  L: 'unselected',
  Z: 'unselected',
  X: 'unselected',
  C: 'unselected',
  V: 'unselected',
  B: 'unselected',
  N: 'unselected',
  M: 'unselected',
};

function App() {
  const [solution, setSolution] = useState('');
  const [board, setBoard] = useState(game);
  const [roundIndex, setRoundIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [roundOver, setRoundOver] = useState(false);
  const [keyColors, setKeyColors] = useState(defaultKeyColors);

  // TODO: Set up game over screen
  const [gameOver, setGameOver] = useState(false);

  // Fetch word list and set solution to random word.
  useEffect(() => {
    const getWord = async () => {
      const wordList = await fetch(WORD_LIST_URL);
      const json = await wordList.json();
      const word = json[Math.floor(Math.random() * json.length)];
      setSolution(word);
    };
    getWord();
  }, []);

  useEffect(() => {
    const solutionArray = solution.split('');
    const updateKeyColors = () => {
      if (roundOver) {
        board[roundIndex - 1].map((guess, index) => {
          if (keyColors[guess] === 'correct') {
            return;
          } else if (guess === solutionArray[index]) {
            setKeyColors((keyColors) => {
              return { ...keyColors, [guess]: 'correct' };
            });
            return;
          } else if (solution.indexOf(guess) >= 0) {
            setKeyColors((keyColors) => {
              return { ...keyColors, [guess]: 'close' };
            });
            return;
          } else
            setKeyColors((keyColors) => {
              return { ...keyColors, [guess]: 'incorrect' };
            });
          // return;
        });
      }
    };
    updateKeyColors();
  }, [keyColors, board[roundIndex]]);

  // Compare letter in guess with letters in solution to determine coloring
  const checkLetter = (letter, index, solution, keyColors) => {
    const correctLetter = solution.slice(index, index + 1);
    if (correctLetter === letter) {
      const keyColorsCopy = { ...keyColors, [letter]: 'correct' };
      setKeyColors(keyColorsCopy);

      return 'correct';
    } else if (solution.split('').indexOf(letter) >= 0) {
      if (keyColors[letter] === 'unselected') {
        const keyColorsCopy = { ...keyColors, [letter]: 'close' };
        setKeyColors(keyColorsCopy);
      }

      return 'close';
    } else {
      if (solution.split('').indexOf(letter) === -1) {
        const keyColorsCopy = { ...keyColors, [letter]: 'incorrect' };
        setKeyColors(keyColorsCopy);
      }

      return 'incorrect';
    }
  };

  useEffect(() => {
    const keyEvent = (e) => {
      console.log(e.key);
      switch (e.key) {
        case 'Enter': {
          if (letterIndex < 5) {
          } else {
            setRoundIndex((roundIndex) =>
              Math.min(NUM_OF_ROUNDS, roundIndex + 1)
            );
            setLetterIndex((letterIndex) => 0);
            setRoundOver(true);
          }

          return;
        }

        case 'Backspace': {
          const newIndex = Math.max(0, letterIndex - 1);
          const boardCopy = [...board];
          boardCopy[roundIndex][letterIndex - 1] = ' ';
          setBoard(boardCopy);
          setLetterIndex(newIndex);
          return;
        }

        default: // Passed testing on https://regex101.com/
          const isSingleAlphaChar = /^[a-zA-Z]$/;
          if (letterIndex < 5 && isSingleAlphaChar.test(e.key)) {
            setLetterIndex((letterIndex) => letterIndex + 1);
            const boardCopy = [...board];
            boardCopy[roundIndex][letterIndex] = e.key.toUpperCase();
            setBoard(boardCopy);
            return;
          }
      }
    };

    window.addEventListener('keydown', keyEvent);

    return () => window.removeEventListener('keydown', keyEvent);
  }, [letterIndex, board, roundIndex]);

  return (
    <div className="game-container">
      {gameOver ? (
        <GameOver />
      ) : (
        board.map((round, index) => (
          <Row
            key={index}
            id={index}
            round={round}
            roundIndex={roundIndex}
            roundOver={roundOver}
            setRoundOver={setRoundOver}
            checkLetter={checkLetter}
            keyColors={keyColors}
          />
        ))
      )}
      <Keyboard keyColors={keyColors} />
    </div>
  );
}

export default App;
