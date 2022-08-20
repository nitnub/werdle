import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
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
  const [outcome, setOutcome] = useState(0)
  console.log('rendering!')

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

  // Set keyboard colors / classes
  useEffect(() => {
    console.log('setting colors')
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

  // Compare letter in guess with letters in solution to determine gameboard coloring
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

  const checkGameOver = () => {
    const response = board[roundIndex].join('')

    if (solution === response) {
      setGameOver(true);
      setOutcome(1);
    } else if (roundIndex === NUM_OF_ROUNDS - 1) {
      setGameOver(true);
      setOutcome(2);
    }
    
  }
  // Interpret key events
  // TODO: add useCallback
  const keyEvent = (letter) => {
    console.log(letter);
    console.log(gameOver);
    if (gameOver) return;
    switch (letter) {
      case 'Enter': {
        if (letterIndex >= 5) {
          
          setRoundIndex((roundIndex) =>
            Math.min(NUM_OF_ROUNDS, roundIndex + 1)
          );
          setLetterIndex(() => 0);
          setRoundOver(true);
          
          checkGameOver()
        }

        break;
      }
      case 'Del':
      case 'Backspace': {
        const newIndex = Math.max(0, letterIndex - 1);
        const boardCopy = [...board];
        boardCopy[roundIndex][letterIndex - 1] = ' ';
        setBoard(boardCopy);
        setLetterIndex(newIndex);
        break;
      }

      default: // Passed testing on https://regex101.com/
        const isSingleAlphaChar = /^[a-zA-Z]$/;
        if (letterIndex < 5 && isSingleAlphaChar.test(letter)) {
          setLetterIndex((letterIndex) => letterIndex + 1);
          const boardCopy = [...board];
          boardCopy[roundIndex][letterIndex] = letter.toUpperCase();
          setBoard(boardCopy);
          break;
        }
    }
  };

  useEffect(() => {
    const physicalKeyEvent = (e) => {
      keyEvent(e.key);
    };
    window.addEventListener('keydown', physicalKeyEvent);

    return () => window.removeEventListener('keydown', physicalKeyEvent);
  }, [board, keyEvent]);

  return (
    <div className="container">
      <Header />
      <div className="game-container">
        {outcome  >= 1 && 
          <GameOver outcome={outcome} setOutcome={setOutcome} solution={solution}/>
}
         {outcome < 1 && <div className="game-board">
            {board.map((round, index) => (
              <Row
                key={index}
                id={index}
                round={round}
                roundIndex={roundIndex}
                roundOver={roundOver}
                setRoundOver={setRoundOver}
                checkLetter={checkLetter}
                keyColors={keyColors}
                solution={solution}
              />
            ))}
          </div>
        
            }
        
      </div>
      <Keyboard keyColors={keyColors} keyEvent={keyEvent} />
    </div>
  );
}

export default App;
