import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import './ChoiceCharacter.css';
import John from '../../images/siba.png'
import Tom from '../../images/backgu.png'
import Alex from '../../images/dosaDog.png'

import Game from '../Game/Game'
import { useDispatch } from 'react-redux';

type ChoiceCharacterProps = {
    value: string;
    onSelect1: () => void;
    onSelect2: () => void;
    onSelect3: () => void;
  }

function ChoiceCharacter({ value, onSelect1, onSelect2, onSelect3 }:ChoiceCharacterProps) {
    const dispatch = useDispatch()

    const [gameOn, setGameOn] = useState(false)

    const [ toggleClass, setToggleClass] = useState<number>(0);
    const [ errorMessage, setErrorMessage] = useState<String>("");

    let history = useHistory();
   
    const onGameDesc = () => {
      history.push('/ready/control');
     }
  
    const onGameStart = () => {
      setGameOn(true)
    }

    return (
      <div className="choiceCharacterScreen">
        <div className="chaSelectWrapper">
        <div className="chaSelectBx">
          <div onClick={() => { 
            onSelect1()
            setToggleClass(1)
            setErrorMessage("")
           } } className = {toggleClass === 1 ? 'clickChoiceCard' : 'choiceCard'} >
            <div className="imgBx">
              <img src={John} alt='john' />
            </div>
            <div className="imgBxContent">
             <h2>John</h2>
             <h3>시바견</h3>
            </div>
          </div>
          <div onClick={() => { 
            onSelect2()
            setToggleClass(2)
            setErrorMessage("")
           } } className = {toggleClass === 2 ? 'clickChoiceCard' : 'choiceCard'} >
            <div className="imgBx">
            <img src={Tom} alt='tom' />
            </div>
            <div className="imgBxContent">
             <h2>Tom</h2>
             <h3>진돗개</h3>
            </div>
          </div>
          <div onClick={() => { 
            onSelect3()
            setToggleClass(3)
            setErrorMessage("")
           } } className = {toggleClass === 3 ? 'clickChoiceCard' : 'choiceCard'} >
            <div className="imgBx">
            <img src={Alex} alt='alex' />
            </div>
            <div className="imgBxContent">
             <h2>Alex</h2>
             <h3>도사견</h3>
            </div>
          </div>
        </div>
        </div>
        <div className="chaSelectBtn">
          <h1>{value}</h1>
          {errorMessage && <h1>{errorMessage}</h1> } 
      <button className="chaSelectBtn-desc" onClick={onGameDesc}>게임설명</button>
      <button className="chaSelectBtn-startGame" onClick={onGameStart}>GameStart</button>
      {gameOn && <Game />}
       </div>
      </div>
    );
  }

export default ChoiceCharacter;