import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Story.css';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer'
import Game from '../Game/Game'
import ChoiceCharacter from './ChoiceCharacter'
import { store } from '../../index'


function Story() {
  const history = useHistory()
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const [showSkipButton, setShowSkipButton] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);
  const [isMulti, setIsMulti] = useState<boolean>(false);
  
  const text1: string = `몽몽이는 태어나서 난생 처음 주인과 산책을 했다.
  햇빛이 내리쬐고 바람이 부는 자연을 만끽하면서 바깥 세상은 신세계라는 것을 깨닫는다. 
  자신이 우물 안 개구리였다는 것을 알게 된 몽몽이는 주인을 버리고 가출을 결심한다.
  그러나...
  바깥 세상을 처음 경험해서인지 몇 걸음 가지 않아 길을 잃었고, 
    어느새 몽몽이는 집에서 멀어져 숲을 지나고 있었다.
    그 숲 속에서 스펙타클한 경험을 하게 되는데…`;
  // const text2: string = `
  // 바깥 세상을 처음 경험해서인지 몇 걸음 가지 않아 길을 잃었고, 
  //   어느새 산호는 집에서 멀어져 숲을 지나고 있었다.
  //   그 숲 속에서 스펙타클한 경험을 하게 되는데…!`;

  const gameMode = useSelector((state: RootState) => state.gameReducer.mode, shallowEqual)

  useEffect((): void => {
    if(!gameMode) {
      document.body.style.zoom = 1.2
    }
    
    setTimeout((): void => {
      setShowMoreButton(true);
      setShowSkipButton(true);
    }, 3000);
  }, []);
  // 스토리 더보기
  const moreStory = (): void => {
    setShowMoreButton(false);
    setShowText(true);
  }

  const goChoiceCharacter = () => {
    if(gameMode) {
      setIsMulti(true)
    } else {
      console.log('1',document.body.style.zoom)
      document.body.style.zoom = 1.5
      console.log('1',document.body.style.zoom)
      history.push('/ready/character')
    }
  }
  return isMulti ? <ChoiceCharacter /> : (
    <div className="full-screen">
      <h2>게임 스토리 설명</h2>
      <div className="story-area">
        <div className="only-hidden">
          <div className="storytelling">
          {!showText && <div className="storytelling-start">
              <div>{text1}</div>
            </div>}
            {/* {showText && (
              <div className="storytelling-restart">
                <div>{text1}</div>
                <br />
                <br />
                <div>{text2}</div>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className="moreOrSkip">
        {/* {showMoreButton && <button className="more story-button" onClick={moreStory}>더보기</button>} */}
        {showSkipButton && <button className="skip story-button" onClick={goChoiceCharacter}>SKIP</button>}
      </div>
    </div>
  )
}
export default Story