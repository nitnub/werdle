import './App.css';
import React, { useEffect, useState } from 'react';



function Row({ round, solution, currentLetter}) {

  const letterClass = checkLetter(currentLetter, 1, solution )
  return (
    
<div className="row">
  {round.map((letter, index) => <div key={index} className={"box " + letterClass } >{letter}</div> )}

</div>
  )
}

// Word resource link
const WORD_LIST_URL = './res/words.json';
const WORD_LENGTH = 5;
const NUM_OF_ROUNDS = 6;


// Create board using defined number of letters per round and rounds per game 
let round = Array(WORD_LENGTH).fill(' ')
let game = []
for (let i = 0; i < NUM_OF_ROUNDS; i++) {
  game.push([...round])
}

const checkLetter = (letter, index, solution ) => {

  
  const correctLetter = solution.slice(index, index + 1);

  if (solution.split().indexOf(letter.toUpperCase()) >= 0) {

    return 'close'
  } else if (correctLetter === letter.toUpperCase()) {

    return 'correct'
  } else {
    return 'incorrect'
  }
}

function App() {

  const [solution, setSolution] = useState('');
  const [board, setBoard] = useState(game);
  const [currentLetter, setCurrentLetter] = useState('');
  const [currentRound, setCurrentRound] = useState([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  
  useEffect(() => {
    const getWord = async () => {
      const wordList = await fetch(WORD_LIST_URL);
      const json = await wordList.json();
      const word = json[Math.floor(Math.random() * json.length)]
      setSolution(word);
    } 
    getWord()
  }, [])

  console.log(solution)
  useEffect(() => {

    if (letterIndex < WORD_LENGTH) {
    const keyListener = (e) => {
      console.log(e.key)
      setCurrentLetter(e.key.toUpperCase())
      let newBoard = [...board]
      newBoard[roundIndex][letterIndex] = e.key.toUpperCase();
      setBoard(newBoard)

      setLetterIndex((letterIndex) => letterIndex + 1)
      
    }

    const updateKey = () => {
      window.addEventListener('keydown', keyListener)      
    }
  
    updateKey()
    return () => window.removeEventListener('keydown', keyListener);
  }
  }, [currentLetter, board])



  return (
    <div className="game-container">
      {board.map((round, index) => <Row key={index} round={round} currentLetter={currentLetter} solution={solution} />)}
   
    </div>
  );
}

export default App;
