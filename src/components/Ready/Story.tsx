import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Story.css';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer'
import ChoiceCharacter from './ChoiceCharacter'

function Story() {
  const history = useHistory()
  const [showText, setShowText] = useState<boolean>(false);
  const [isMulti, setIsMulti] = useState<boolean>(false);

  const gameMode = useSelector((state: RootState) => state.gameReducer.mode, shallowEqual)

  const moreStory = (): void => {
    setShowText(true);
  }

  const goChoiceCharacter = () => {
    if(gameMode) {
      setIsMulti(true)
    } else {
      history.push('/ready/character')
    }
  }
  return isMulti ? <ChoiceCharacter /> : (
    <div className="full-screen" style={{ 
      backgroundImage: `url(${process.env.REACT_APP_URL 
          + "/nightDark.png"})`, backgroundRepeat: "no-repeat"
    }}>
      <h2>게임 스토리 설명</h2>
      <div className="story-area">
        <div className="only-hidden">
          <div className="storytelling">
          {!showText && <div className="storytelling-start">
            <p>
              몽몽이는 태어나서 난생 처음 주인과 산책을 했다. <br/>
              햇빛이 내리쬐고 바람이 부는 자연을 만끽하면서 바깥 세상은 신세계라는 것을 깨닫는다. <br/>
              자신이 우물 안 개구리였다는 것을 알게 된 몽몽이는 <br/>
              주인을 버리고 가출을 결심한다. <br/>
              그러나... <br/>
              바깥 세상을 처음 경험해서인지 몇 걸음 가지 않아 길을 잃었고, <br/>
              어느새 몽몽이는 집에서 멀어져 숲을 지나고 있었다. <br/>
              그 숲 속에서 스펙타클한 경험을 하게 되는데…  
            </p>
          </div>}
          </div>
        </div>
      </div>
      <div className="moreOrSkip">
        <button className="skip story-button" onClick={goChoiceCharacter}>SKIP</button>
      </div>
    </div>
  )
}
export default Story