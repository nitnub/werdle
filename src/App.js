import './App.css';
import React, { useEffect, useState } from 'react';

function Row({ id, round, solution, currentLetter, letterIndex, roundIndex }) {
  const [classes, setClasses] = useState('box');

  const letterClass = checkLetter(currentLetter, letterIndex - 1, solution);
  // console.log(letterClass);

  return (
    <div className="row">
      {round.map((letter, index) => (
        <div key={index} className={classes}>
          {letter}
        </div>
      ))}
    </div>
  );
}

// Word resource link
// const WORD_LIST_URL = './res/words.json';
const WORD_LIST_URL = './res/words.test.json';
const WORD_LENGTH = 5;
const NUM_OF_ROUNDS = 6;

// Create board using defined number of letters per round and rounds per game
let round = Array(WORD_LENGTH).fill(' ');
let game = [];
for (let i = 0; i < NUM_OF_ROUNDS; i++) {
  game.push([...round]);
}

const checkLetter = (letter, index, solution) => {
  const correctLetter = solution.slice(index, index + 1);
  console.log('correct letter: ', correctLetter);
  // console.log('solution.split: ', solution.split('').indexOf(letter));
  if (correctLetter === letter) {
    // console.log('CORRECT!');
    return 'correct';
  } else if (solution.split('').indexOf(letter) >= 0) {
    return 'close';
  } else {
    return 'incorrect';
  }
};

function App() {
  const [solution, setSolution] = useState('');
  const [board, setBoard] = useState(game);
  const [currentLetter, setCurrentLetter] = useState('');
  const [currentRound, setCurrentRound] = useState(round);
  const [roundIndex, setRoundIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    const getWord = async () => {
      const wordList = await fetch(WORD_LIST_URL);
      const json = await wordList.json();
      const word = json[Math.floor(Math.random() * json.length)];
      setSolution(word);
    };
    getWord();
  }, []);

  const checkRound = (roundId) => {
    console.warn('CHECK ROUND', roundId);
  };

  console.log(solution);


  useEffect(() => {
    const keyEvent = (e) => {
      console.log(e.key);
      switch (e.key) {
        case 'Enter': {
          if (letterIndex < 5) {
            console.log('Not enough letters!');
          } else {
            console.log('Check vs correct word');
            console.log(currentRound)
          }

          return; // check round
        }

        case 'Backspace': {
          const newIndex = Math.max(0, letterIndex - 1);
          // const currentRoundCopy = [...currentRound];
          // currentRoundCopy[letterIndex - 1] = ' ';
          // setCurrentRound(currentRoundCopy
          // );
          const boardCopy = [...board]
          // boardCopy[roundIndex] = currentRound
          boardCopy[roundIndex][letterIndex - 1] = ' '
          setBoard(boardCopy)
          // setCurrentRound((currentRound) =>
          //   [...currentRound].splice(letterIndex, 1, ' ')
          // );
          setLetterIndex(newIndex);
          return;
        }

        default:
          if (letterIndex < 5) {
            setCurrentLetter(e.key.toUpperCase());
            // const currentRoundCopy = [...currentRound];
            // currentRoundCopy[letterIndex] = e.key.toUpperCase();
            // setCurrentRound(currentRoundCopy);
            setLetterIndex((letterIndex) => letterIndex + 1);
            const boardCopy = [...board]
            // boardCopy[roundIndex] = currentRound
            boardCopy[roundIndex][letterIndex] = e.key.toUpperCase()
            setBoard(boardCopy)

            return;
          }
      }
    };

    window.addEventListener('keydown', keyEvent);

    return () => window.removeEventListener('keydown', keyEvent);
  }, [currentRound.length, letterIndex, board, currentRound, roundIndex]);

  return (
    <div className="game-container">
      {board.map((round, index) => (
        <Row
          key={index}
          id={index}
          // round={currentRound}
          round={board[index] }
          roundIndex={roundIndex}
          currentLetter={round[index]}
          solution={solution}
          letterIndex={letterIndex}
        />
      ))}
    </div>
  );
}

export default App;
