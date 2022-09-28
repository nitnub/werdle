import './App.css';
import React, { useEffect, useState } from 'react';
import Header from '../src/components/Header';
import Keyboard from '../src/components/Keyboard';
import Row from '../src/components/Row';
import GameOver from '../src/components/GameOver';
import Modal from 'react-bootstrap/Modal';
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

// Create starter object with Default key colors
const defaultKeyColors = {};
[...Array(26)]
  .map((elem, index) => String.fromCharCode(index + 65))
  .forEach((letter) => (defaultKeyColors[letter] = 'unselected'));

function App() {
  const [solution, setSolution] = useState('');
  const [board, setBoard] = useState(game);
  const [roundIndex, setRoundIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [roundOver, setRoundOver] = useState(false);
  const [keyColors, setKeyColors] = useState(defaultKeyColors);
  const [globalIndex, setGlobalIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // TODO: Set up game over screen
  const [gameOver, setGameOver] = useState(false);
  const [outcome, setOutcome] = useState(0);

  // Set box sizes
  const rowHeight = () => document.getElementById('row0')?.clientHeight;
  const boardHeight = () => document.getElementById('game-board')?.clientHeight;
  const [boxHeight, setBoxHeight] = useState(rowHeight());

  const getRoundIndex = () => {
    return globalIndex % WORD_LENGTH;
  };

  useEffect(() => {
    const resizeRows = () => {
      console.log(rowHeight());
      // setBoxHeight(() =>Math.min(rowHeight(), 64));
      setBoxHeight(() => rowHeight());
    };
    resizeRows();
    window.addEventListener('resize', resizeRows);
    return () => window.removeEventListener('resize', resizeRows);
    // }, [boxHeight, letterIndex, gameOver]);
  });

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

  const checkGameOver = () => {
    const response = board[roundIndex].join('');

    if (solution === response) {
      setGameOver(true);
      setOutcome(1);
      setModalVisible(() => true);
    } else if (roundIndex === NUM_OF_ROUNDS - 1) {
      setGameOver(true);
      setOutcome(2);
      setModalVisible(() => true);
    }
  };

  const keyEvent = (letter) => {
    if (gameOver) return;
    switch (letter) {
      case 'Enter': {
        if (letterIndex >= 5) {
          setRoundIndex((roundIndex) =>
            Math.min(NUM_OF_ROUNDS, roundIndex + 1)
          );
          setLetterIndex(() => 0);
          setRoundOver(true);
          checkGameOver();
        }
        break;
      }
      case 'Del':
      case 'Backspace': {
        const previousLetter = Math.max(0, letterIndex - 1);
        const boardCopy = [...board];
        boardCopy[roundIndex][previousLetter] = ' ';
        setBoard(boardCopy);
        setLetterIndex(previousLetter);
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

  // // Set keyboard colors / classes

  useEffect(() => {
    const solutionArray = solution.split('');

    let tempKeys = {};
    const updateKeyColors = () => {
      if (roundOver) {
        board[roundIndex - 1].forEach((guess, index) => {
          // appproach 1

          if (tempKeys[guess] === 'correct') return;
          if (guess === solutionArray[index]) {
            tempKeys = { ...tempKeys, [guess]: 'correct' };
          } else if (solution.indexOf(guess) >= 0) {
            tempKeys = { ...tempKeys, [guess]: 'close' };
          } else {
            tempKeys = { ...tempKeys, [guess]: 'incorrect' };
          }

          setKeyColors((keyColors) => ({ ...keyColors, ...tempKeys }));

        });
      }
    };
    roundIndex <= NUM_OF_ROUNDS && updateKeyColors();
    // }, [roundIndex, keyColors]);
  });

  return (
    <div className="container">
      <Header />

      <GameOver
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        outcome={outcome}
        setOutcome={setOutcome}
        solution={solution}
      />

      <div className="game-container">
        <div id="game-board" className="game-board">
          {board.map((round, index) => (
            <Row
              key={index}
              id={index}
              round={round}
              roundIndex={roundIndex}
              roundOver={roundOver}
              setRoundOver={setRoundOver}
              // checkLetter={checkLetter}
              keyColors={keyColors}
              setKeyColors={setKeyColors}
              solution={solution}
              boxHeight={boxHeight}
            />
          ))}
        </div>
      </div>
      <Keyboard keyColors={keyColors} keyEvent={keyEvent} />
    </div>
  );
}

export default App;
