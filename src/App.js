import './App.css';
import gameStateReducer from './context/gameStateReducer';
import React, { useEffect, useReducer, useState } from 'react';
import defaultState from './context/defaultState';
// import GameBoard from './components/GameBoard';
import Board from './components/GameBoard/Board';
// import Header from '../src/components/Header';
import Header from './components/Header';
// import Keyboard from '../src/components/Keyboard';
// import Keyboard from './components/Keyboard';
import Keyboard from './components/Keyboard';
import Row from './components/xRow';
import GameOver from '../src/components/GameOver';
import SettingsBar from './components/SettingsBar';
import getWordOfLength from './utils/getWordOfLength';
// import Header from './components/Header'

const defaultLength = 5;
const defaultGuesses = 6;

// Create board using defined number of letters per round and rounds per game
const createBoard = (wordLength, guessCount) => {
  let round = Array(wordLength).fill(' ');
  let game = [];
  for (let i = 0; i < guessCount; i++) {
    game.push([...round]);
  }
  return game;
};
let game = createBoard(defaultLength, defaultGuesses);

// Create starter object with Default key colors
const defaultKeyColors = {};
// [...Array(26)]
//   .map((elem, index) => String.fromCharCode(index + 65))
//   .forEach((letter) => (defaultKeyColors[letter] = 'unselected'));

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

  // Settings Bar
  const [length, setLength] = useState(defaultLength);
  const [guesses, setGuesses] = useState(defaultGuesses);

  // Reducer State
  const [state, dispatch] = useReducer(gameStateReducer, defaultState);

  useEffect(() => {
    dispatch({ type: 'FETCH_SUCCESS', payload: 'test' });
    console.log(state.board);
  }, []);

  const getRoundIndex = () => {
    return Math.floor(globalIndex / length);
  };

  const finalLetter = () => {
    if (globalIndex === 0) return false;
    return globalIndex % length === 0;
  };

  const wordIndex = () => {
    return globalIndex % length;
  };

  const allowDelete = () => {
    if (globalIndex === 0) return false;
    if (!sameRound && wordIndex() === 0) return true;
    if (wordIndex() === 0) return false;

    console.log('trearfea false');
    return true;
  };
  const removeClasses = (str, classArray) => {
    const elementArray = document.getElementsByClassName(str);
    for (let box of elementArray) {
      box.className = 'box undefined';
    }
    console.log(elementArray);
  };
  const resetBoxes = () => {
    removeClasses('box', ['correct', 'incorrect', 'close']);
  };

  const resetGame = async () => {
    console.log('reset game!');
    setSolution(await getWordOfLength(length));
    setBoard(createBoard(length, guesses));

    setRoundOver(false);
    setKeyColors(defaultKeyColors);
    setGlobalIndex(0);
    setSameRound(true);
    setGameOver(false);
    setOutcome(0);

    resetBoxes();
    console.log('solution', solution);
  };

  useEffect(() => {
    async function update() {
      setSolution(await getWordOfLength(length));
    }
    update();
  }, []);

  const checkGameOver = () => {
    // Now that the round is over, check the (now previous) round for game over state

    const response = board[getRoundIndex() - 1].join('');

    if (solution === response) {
      setGameOver(true);
      setOutcome(1);
      setModalVisible(() => true);
    } else if (getRoundIndex() === guesses) {
      setGameOver(true);
      setOutcome(2);
      setModalVisible(() => true);
    }
  };

  const keyEvent = (letter) => {
    console.log('letter coming in is !...', letter);
    if (wordIndex() >= 1) setSameRound(() => false);

    if (gameOver) return;

    switch (letter) {
      case 'Enter': {
        setSameRound(() => true);
        if (finalLetter()) {
          // Put reducer in this if block, not outside!
          console.log('final enter!');
          setRoundOver(() => true);
          updateKeyColors();
          checkGameOver(); // keep this separate, not a part of END_TURN reducer
        }
        break;
      }
      case 'Del':
      case 'Backspace': {
        if (allowDelete()) {
          const boardCopy = [...board];

          const previousIndex = Math.max(0, globalIndex - 1);

          if (wordIndex() === 0 && !sameRound) {
            boardCopy[getRoundIndex() - 1][length - 1] = ' ';
            setGlobalIndex(() => previousIndex);
          } else {
            boardCopy[getRoundIndex()][wordIndex() - 1] = ' ';
            setGlobalIndex(() => previousIndex);
          }

          setBoard(boardCopy);
          setSameRound(() => true);
        }

        break;
      }
      case letter.match(/^[a-zA-Z]$/)?.input: {
        if (sameRound) {
          console.log('letter matches:', letter);
          const boardCopy = [...board];
          if (boardCopy[getRoundIndex()][wordIndex()] === ' ') {
            boardCopy[getRoundIndex()][wordIndex()] = letter.toUpperCase();
          }
          setBoard(boardCopy);

          if (sameRound) {
            setGlobalIndex(() => globalIndex + 1);
          }
          if (globalIndex > 0 && wordIndex() === length - 1) {
            setSameRound(() => false);
          }
          if (globalIndex > 0 && wordIndex() < length - 1) {
            setSameRound(() => true);
          }
        }
        break;
      }
      default:
        console.log(letter);
        setGlobalIndex(globalIndex);
    }
  };

  const updateKeyColors = () => {
    const solutionArray = solution.split('');
    let tempKeys = {};

    board[getRoundIndex() - 1].forEach((guess, index) => {
      if (keyColors[guess] === 'correct' || tempKeys[guess] === 'correct')
        return;
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

  const settingsProps = {
    defaultLength,
    setLength,
    defaultGuesses,
    setGuesses,
    resetGame,
  };

  return (
    <>
      <div className="content">
        <Header resetGame={resetGame} settings={settingsProps} />
        <GameOver
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          outcome={outcome}
          solution={solution}
        />

        <div className="game-container">
          <div className="settings desktop-only">
            <SettingsBar settings={settingsProps} />
          </div>
          <Board state={state} dispatch={dispatch} />
          {/* <div id="game-board" className="game-board">
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
          </div> */}
        </div>
        <Keyboard
          state={state}
          dispatch={dispatch}
          keyColors={keyColors}
          keyEvent={keyEvent}
        />
        {/* <Keyboard state={state} dispatch={dispatch} keyColors={keyColors} keyEvent={keyEvent} /> */}
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
