import './App.css';
import React, { useEffect, useState } from 'react';
import Header from '../src/components/Header';
import Keyboard from '../src/components/Keyboard';
import Row from '../src/components/Row';
import GameOver from '../src/components/GameOver';
import Modal from 'react-bootstrap/Modal';
import { ProgressBar } from 'react-bootstrap';
// Word resource link
// const WORD_LIST_URL = './res/words.json';
const WORD_LIST_URL = './res/words.test.json';
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
  // const [roundIndex, setRoundIndex] = useState(0);
  // const [letterIndex, setLetterIndex] = useState(0);
  const [roundOver, setRoundOver] = useState(false);
  const [keyColors, setKeyColors] = useState(defaultKeyColors);
  const [globalIndex, setGlobalIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [sameRound, setSameRound] = useState(true); // 7
  // const [newRound, setNewRound] = useState(false); // 8
  const [freshState, setFreshState] = useState(false);
  // TODO: Set up game over screen
  const [gameOver, setGameOver] = useState(false);
  const [outcome, setOutcome] = useState(0);

  // const getRoundIndex = () => {
  //   return globalIndex % WORD_LENGTH;
  // };
  const getRoundIndex = () => {
    return Math.floor(globalIndex / 5);
  };

  const finalLetter = () => {
    if (globalIndex === 0) return false;
    // return (globalIndex + 1) % 5 === 0;
    return globalIndex % 5 === 0;
  };

  const xxxletterIndex = () => {
    return globalIndex % 5;
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
      box.className = 'box undefined'
    }
    console.log(elementArray);
  };
  const resetBoxes = () => {
    removeClasses('box', ['correct', 'incorrect', 'close']);
  };

  const resetGame = () => {
    // setBoard(createBoard(WORD_LENGTH, NUM_OF_ROUNDS));
    // // setRoundIndex(0);
    // // setLetterIndex(0);
    // setGlobalIndex(0);
    // setRoundOver(false);
    // setKeyColors(defaultKeyColors);
    // setOutcome(0);
    // setNewSolution(WORD_LIST_URL);
    // resetBoxes();
    // setSameRound(true);
    // setGameOver(false);
    // setNewRound(false);
    // // window.location.reload();

    // const boxDivs = document.getElementsByClassName('box');
    // // console.log(Array.isArray(boxDivs));
    // for (let i = boxDivs.length - 1; i >= 0; i--) {
    //   boxDivs[i].classList.add = 'correct'; //'box correct';
    //   // boxDivs[i].class = 'box';
    // }

    // setSolution('');
    setNewSolution(WORD_LIST_URL);
    setBoard(createBoard(WORD_LENGTH, NUM_OF_ROUNDS));
    // const [roundIndex, setRoundIndex] = useState(0);
    // const [letterIndex, setLetterIndex] = useState(0);
    setRoundOver(false);
    setKeyColors(defaultKeyColors);
    setGlobalIndex(0);
    setModalVisible(false);
    setSameRound(true);
    // setNewRound(false);/
    setFreshState(false);
    // TODO: Set up game over screen
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
    // console.log(`[debug] Round Index: ${getRoundIndex() - 1}`);
    // const response = board[roundIndex].join('');
    const response = board[getRoundIndex() - 1].join('');
    // console.log(`[debug] Round Index:
    //   Solution: ${solution}
    //   Response: ${response}
    //   `);

    if (solution === response) {
      // console.log(`[debug] Solution === response: ${solution} === ${response}`);
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
    // console.log(`[debug]
    //   Solution: ${solution}
    //   globalIndex: ${globalIndex}
    //   roundIndex: ${getRoundIndex()}
    //   roundOver: ${roundOver}
    //   gameOver: ${gameOver}
    //   sameRound: ${sameRound}
    //   newRound: {newRound}
    //   `);
    // console.log(`[debug]
    // board: ${board}

    // `);

    // updateKeyColors();
    // setRoundOver(() => true);
    // checkGameOver();

    if (xxxletterIndex() === 4) {
      setFreshState(false);
    }
    if (xxxletterIndex() === 1) {
      setFreshState(true);
    }
    // if (xxxletterIndex() >= 1) setNewRound(() => false);
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
          // console.log(letter)
        }
        break;
      }
      case 'Del':
      case 'Backspace': {
        if (allowDelete()) {
          const boardCopy = [...board];
          // console.log('FRESH STATE IS', freshState);
          // console.log('letter index is:', xxxletterIndex());
          const previousIndex = Math.max(0, globalIndex - 1);
          // if (freshState && xxxletterIndex() === 0) {
          //   console.log('broken sw', xxxletterIndex());
          // // } else if (xxxletterIndex() === 0 && !newRound) {
          // } else 
          
          if (xxxletterIndex() === 0 && !sameRound) {
            boardCopy[getRoundIndex() - 1][4] = ' ';
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
          // console.log('12345');
          setBoard(boardCopy);

          if (sameRound) {
            setGlobalIndex(() => globalIndex + 1);
          }
          if (globalIndex > 0 && xxxletterIndex() === 4) {
            setSameRound(() => false);
            // setNewRound(() => false);
          }
          if (globalIndex > 0 && xxxletterIndex() < 4) {
            // console.log('SWITCH', newRound);
            // setNewRound(() => true);
            setSameRound(() => true)
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
    // board[roundIndex].forEach((guess, index) => {
    board[getRoundIndex() - 1].forEach((guess, index) => {
      if (tempKeys[guess] === 'correct') return;
      // console.log(tempKeys);
      if (guess === solutionArray[index]) {
        tempKeys = { ...tempKeys, [guess]: 'correct' };
        console.log('A correct letter!', guess);
      } else if (solution.indexOf(guess) >= 0) {
        tempKeys = { ...tempKeys, [guess]: 'close' };
        console.log('A close letter!', guess);
      } else {
        console.log('A wrong letter!', guess);
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
              // roundIndex={roundIndex}
              roundIndex={getRoundIndex()}
              roundOver={roundOver}
              setRoundOver={setRoundOver}
              // checkLetter={checkLetter}
              keyColors={keyColors}
              setKeyColors={setKeyColors}
              solution={solution}
              globalIndex={globalIndex}
              setGlobalIndex={setGlobalIndex}
              // boxHeight={boxHeight}
              setSameRound={setSameRound}
              // setNewRound={setNewRound}
              setFreshState={setFreshState}
            />
          ))}
        </div>
      </div>
      <Keyboard keyColors={keyColors} keyEvent={keyEvent} />
    </div>
  );
}

export default App;
