import React, { useState } from 'react';
import { store } from '../../index'

import Control from './Control'
import './ChoiceCharacter.css';
import John from '../../images/siba.png'
import Tom from '../../images/backgu.png'
import Alex from '../../images/dosaDog.png'

import Game from '../Game/Game'
import { useDispatch } from 'react-redux';

function ChoiceCharacter() {
    const dispatch = useDispatch()

    const [gameOn, setGameOn] = useState(false)
    const [gameInfo, setGameInfo] = useState(false)

    const [toggleClass, setToggleClass] = useState<number>(0)
    const [errorMessage, setErrorMessage] = useState<String>("")
   
    const onGameDesc = () => {
      setGameInfo(true)
     }
  
    const onGameStart = () => {
      if(toggleClass === 0) {
        setErrorMessage('캐릭터를 선택하세요');
      }
      else {
        setGameOn(true)
      }
    }

    return gameOn ? <div className='GCbox' ><Game /></div> : gameInfo ? <Control /> : (
      <div className="choiceCharacterScreen">
        <div className="chaSelectWrapper">
        <div className="chaSelectBx">
          <div onClick={() => { 
            dispatch({
              type: 'SELECT_CHAR_1'
            })
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
            dispatch({
              type: 'SELECT_CHAR_2'
            })
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
            dispatch({
              type: 'SELECT_CHAR_3'
            })
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
          <h1>{store.getState().choice.char === 'dog' ? '시바견' : store.getState().choice.char === 'dog2' ? '진돗개' : store.getState().choice.char === 'dog3' ? '도사견' : null}</h1>
          {errorMessage && <h1>{errorMessage}</h1> }
      <button className="chaSelectBtn-desc" onClick={onGameDesc}>게임설명</button>
      <button className="chaSelectBtn-startGame" onClick={onGameStart}>GameStart</button>
       </div>
      </div>
    );
  }

export default ChoiceCharacter;