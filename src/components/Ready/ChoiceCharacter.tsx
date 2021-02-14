import React, { useState } from 'react';
import { createBrowserHistory } from 'history'
import { store } from '../../index'

import Control from './Control'
import './ChoiceCharacter.css';
import John from '../../images/siba.png'
import Tom from '../../images/backgu.png'
import Alex from '../../images/dosaDog.png'

import Game from '../Game/Game'
import { useDispatch } from 'react-redux';
import jwt from 'jsonwebtoken'
import { getMySocketId, verifySocket } from '../../utils/socket'

function ChoiceCharacter() {
  const history = createBrowserHistory({ forceRefresh: true })
  const dispatch = useDispatch()

  const [gameOn, setGameOn] = useState(false)
  const [gameInfo, setGameInfo] = useState(false)

  const [toggleClass, setToggleClass] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<String>("")

  const onGameDesc = () => {
    setGameInfo(true)
  }

  const onGameStart = async () => {
    if (toggleClass === 0) setErrorMessage('캐릭터를 선택하세요')
    else {
      if(getMySocketId()) {
        const token = jwt.sign(getMySocketId(), process.env.REACT_APP_SECRET as string)
        verifySocket.getAccessToken(token)
        verifySocket.getAccessTokenListen(gotToken)
      }
      else {
        alert('서버 점검 중입니다.')
        history.push('/mode')
      }
    }
  }

  async function gotToken (token: string) {
    if(token) {
      dispatch({
        type: 'ACCESS_TOKEN',
        value: token
      })
      setGameOn(true)
    }
  }

  return gameOn ? <Game /> : gameInfo ? <Control /> : (
    <div className="choiceCharacterScreen">
      <div className="chaSelectWrapper">
        <div className="chaSelectBx">
          <div onClick={() => {
            dispatch({
              type: 'SELECT_CHAR_1'
            })
            setToggleClass(1)
            setErrorMessage("")
          }} className={toggleClass === 1 ? 'clickChoiceCard' : 'choiceCard'} >
            <div className="imgBx">
              <img src={John} alt='감자' />
            </div>
            <div className="imgBxContent">
              <h2>감자</h2>
            </div>
          </div>
          <div onClick={() => {
            dispatch({
              type: 'SELECT_CHAR_2'
            })
            setToggleClass(2)
            setErrorMessage("")
          }} className={toggleClass === 2 ? 'clickChoiceCard' : 'choiceCard'} >
            <div className="imgBx">
              <img src={Tom} alt='사랑' />
            </div>
            <div className="imgBxContent">
              <h2>사랑</h2>
            </div>
          </div>
          <div onClick={() => {
            dispatch({
              type: 'SELECT_CHAR_3'
            })
            setToggleClass(3)
            setErrorMessage("")
          }} className={toggleClass === 3 ? 'clickChoiceCard' : 'choiceCard'} >
            <div className="imgBx">
              <img src={Alex} alt='초코' />
            </div>
            <div className="imgBxContent">
              <h2>초코</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="chaSelectBtn">
        <h1>{store.getState().choiceReducer.char === 'dog' ? '감자' : store.getState().choiceReducer.char === 'dog2' ? '사랑' : store.getState().choiceReducer.char === 'dog3' ? '초코' : null}</h1>
        {errorMessage && <h1>{errorMessage}</h1>}
        <button className="chaSelectBtn-desc" onClick={onGameDesc}>게임설명</button>
        <button className="chaSelectBtn-startGame" onClick={onGameStart}>GameStart</button>
      </div>
    </div>
  );
}

export default ChoiceCharacter;