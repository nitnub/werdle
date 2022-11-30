import './App.css';
import React, { useEffect, useState } from 'react';
import Header from '../src/components/Header';
import Keyboard from '../src/components/Keyboard';
import Row from '../src/components/Row';
import GameOver from '../src/components/GameOver';

// Word resource link
const WORD_LIST_URL = './res/words.json';
// const WORD_LIST_URL = './res/words.test.json';
const WORD_LENGTH = 5;
const NUM_OF_ROUNDS = 6;

// Create board using defined number of letters per round and rounds per game
const createBoard = (WORD_LENGTH, NUM_OF_ROUNDS) => {
  let round = Array(WORD_LENGTH).fill(' ');
  let game = [];
  for (let i = 0; i < NUM_OF_ROUNDS; i++) {
    game.push([...round]);
  }
  return game;
};
let game = createBoard(WORD_LENGTH, NUM_OF_ROUNDS);

// Create starter object with Default key colors
const defaultKeyColors = {};
[...Array(26)]
  .map((elem, index) => String.fromCharCode(index + 65))
  .forEach((letter) => (defaultKeyColors[letter] = 'unselected'));

function App() {
  const [solution, setSolution] = useState('');
  const [board, setBoard] = useState(game);
  const [roundOver, setRoundOver] = useState(false);
  const [keyColors, setKeyColors] = useState(defaultKeyColors);
  const [globalIndex, setGlobalIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [sameRound, setSameRound] = useState(true); // 7

  const [gameOver, setGameOver] = useState(false);
  const [outcome, setOutcome] = useState(0);

  const getRoundIndex = () => {
    return Math.floor(globalIndex / WORD_LENGTH);
  };

  const finalLetter = () => {
    if (globalIndex === 0) return false;
    return globalIndex % WORD_LENGTH === 0;
  };

  const xxxletterIndex = () => {
    return globalIndex % WORD_LENGTH;
  };

  const allowDelete = () => {
    if (globalIndex === 0) return false;

    // if (!newRound && xxxletterIndex() === 0) return true;
    if (!sameRound && xxxletterIndex() === 0) return true;
    if (xxxletterIndex() === 0) return false;

    console.log('trearfea false');
    return true;
  };
  const removeClasses = (str, classArray) => {
    const elementArray = document.getElementsByClassName(str);
    for (let box of elementArray) {
      // box.classList.remove(...classArray);
      // box.classList.add(['undefined']);
      // box.className = 'box undefined'
      box.className = 'box undefined';
    }
    console.log(elementArray);
  };
  const resetBoxes = () => {
    removeClasses('box', ['correct', 'incorrect', 'close']);
  };

  const resetGame = () => {
    setNewSolution(WORD_LIST_URL);
    setBoard(createBoard(WORD_LENGTH, NUM_OF_ROUNDS));

    setRoundOver(false);
    setKeyColors(defaultKeyColors);
    setGlobalIndex(0);
    setSameRound(true);
    setGameOver(false);
    setOutcome(0);

    resetBoxes();
  };

  // Fetch word list and set solution to random word.

  async function setNewSolution(url) {
    const req = await fetch(url);
    const wordList = await req.json().then((obj) => obj.data);
    // console.log(wordList);
    // const word = json[Math.floor(Math.random() * json.length)];
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(`word:`, word);
    setSolution(word);
  }

  useEffect(() => {
    setNewSolution(WORD_LIST_URL);
  }, []);

  const checkGameOver = () => {
    // Now that the round is over, check the (now previous) round for game over state

    const response = board[getRoundIndex() - 1].join('');

    if (solution === response) {
      setGameOver(true);
      setOutcome(1);
      setModalVisible(() => true);
      // } else if (roundIndex === NUM_OF_ROUNDS - 1) {
    } else if (getRoundIndex() === NUM_OF_ROUNDS) {
      // console.log(`[debug] getRoundIndex() === NUM_OF_ROUNDS: ${getRoundIndex()} === ${NUM_OF_ROUNDS}`);
      setGameOver(true);
      setOutcome(2);
      setModalVisible(() => true);
    }
  };

  const keyEvent = (letter) => {
    if (xxxletterIndex() >= 1) setSameRound(() => false);

    if (gameOver) return;
    switch (letter) {
      case 'Enter': {
        // if (letterIndex >= 5) {
        // console.log('enter!');

        // if ()

        if (finalLetter()) {
          console.log('final enter!');
          updateKeyColors();
          setRoundOver(() => true);
          checkGameOver();

          // setGlobalIndex(() => globalIndex + 1);
          console.log(letter);
        }
        break;
      }
      case 'Del':
      case 'Backspace': {
        if (allowDelete()) {
          const boardCopy = [...board];

          const previousIndex = Math.max(0, globalIndex - 1);

          if (xxxletterIndex() === 0 && !sameRound) {
            boardCopy[getRoundIndex() - 1][WORD_LENGTH - 1] = ' ';
            setGlobalIndex(() => previousIndex);
          } else {
            boardCopy[getRoundIndex()][xxxletterIndex() - 1] = ' ';
            setGlobalIndex(() => previousIndex);
          }

          setBoard(boardCopy);
          setSameRound(() => true);
        }

        break;
      }
      case letter.match(/^[a-zA-Z]$/)?.input:
        if (sameRound) {
          console.log();
          const boardCopy = [...board];
          if (boardCopy[getRoundIndex()][xxxletterIndex()] === ' ') {
            boardCopy[getRoundIndex()][xxxletterIndex()] = letter.toUpperCase();
          }
          setBoard(boardCopy);

          if (sameRound) {
            setGlobalIndex(() => globalIndex + 1);
          }
          if (globalIndex > 0 && xxxletterIndex() === WORD_LENGTH - 1) {
            setSameRound(() => false);
          }
          if (globalIndex > 0 && xxxletterIndex() < WORD_LENGTH - 1) {
            setSameRound(() => true);
          }
        }
        break;

      default:
        break;
    }
  };

  const updateKeyColors = () => {
    const solutionArray = solution.split('');
    let tempKeys = {};

    board[getRoundIndex() - 1].forEach((guess, index) => {
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
  };

  return (
    <div className="container">
      <Header resetGame={resetGame} />

      <GameOver
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        outcome={outcome}
        solution={solution}
      />

      <div className="game-container">
        <div id="game-board" className="game-board">
          {board.map((round, index) => (
            <Row
              key={index}
              id={index}
              round={round}
              roundIndex={getRoundIndex()}
              roundOver={roundOver}
              setRoundOver={setRoundOver}
              solution={solution}
              globalIndex={globalIndex}
              setGlobalIndex={setGlobalIndex}
              setSameRound={setSameRound}
            />
          ))}
        </div>
      </div>
      <Keyboard keyColors={keyColors} keyEvent={keyEvent} />
    </div>
  );
}

export default App;
