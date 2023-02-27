import React from 'react';
import { getByTestId, getByText, render} from '@testing-library/react'
import SettingsBar from './SettingsBar';
import { createBoard } from "../../context/game.helpers";

const defaultKeyColors = {};
const defaultLength = 5;
const defaultGuesses = 6;


const game = createBoard(defaultLength, defaultGuesses);

const defaultState = {
  solution: '',
  board: game,
  roundOver: false,
  keyColors: defaultKeyColors,
  globalIndex: 0,
  modalVisible: false,
  sameRound: true,
  gameOver: false,
  outcome: 0,
  wordLength: defaultLength,
  guesses: defaultGuesses,
};




test('renders test', () => {

  const dispatch = () =>{}
  const {getByText} = render(<SettingsBar state={defaultState} dispatch={dispatch}/>);
 console.log(getByText)

})