import './App.css';
import gameStateReducer from './context/game.reducer';
import React, { useEffect, useReducer } from 'react';
import defaultState from './context/defaultState';
import Board from './components/GameBoard/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import GameOver from '../src/components/GameOver';
import SettingsBar from './components/SettingsBar';
import getWordOfLength from './utils/getWordOfLength';
import { action } from './context/game.actions';

function App() {
  const [state, dispatch] = useReducer(gameStateReducer, defaultState);

  useEffect(() => {
    async function update() {
      const word = await getWordOfLength(state.wordLength);

      dispatch({ type: action.setNewSolution, payload: word });
      // console.log('WORD:', word);
    }
    update();
  }, [state.wordLength]);

  const hideModal = () => {
    dispatch({ type: action.updateModalVisible, payload: false });
  };


  return (
    <>
      <div className="content">
        <Header state={state} dispatch={dispatch} />
        <GameOver
          show={state.modalVisible}
          onHide={hideModal}
          outcome={state.outcome}
          solution={state.solution}
        />

        <div className="game-container">
          <div className="settings desktop-only">
            <SettingsBar state={state} dispatch={dispatch} />
          </div>
          <Board state={state} dispatch={dispatch} />
        </div>
        <Keyboard state={state} dispatch={dispatch} />
      </div>
    </>
  );
}

export default App;
