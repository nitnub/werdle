import './App.css';
import React, { useEffect, useState } from 'react';



function Row({ solution }) {

  return (
<div className="row">
    <div className="box incorrect">A</div>
    <div className="box correct">B</div>
    <div className="box close">C</div>
    <div className="box"></div>
    <div className="box"></div>
</div>
  )
}

function App() {
  const [solution, setSolution] = useState('');
  const [board, setBoard] = useState([[]])
  const url = './res/words.json';
  
  useEffect(() => {
    const getWord = async () => {
      const wordList = await fetch(url);
      const json = await wordList.json();
      const word = json[Math.floor(Math.random() * json.length)]
      setSolution(word);
    } 
    getWord()
  }, [])

  document.addEventListener('keydown', (e) => {
    console.log(e.key)
  })

  return (
    <div className="game-container">
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  );
}

export default App;
