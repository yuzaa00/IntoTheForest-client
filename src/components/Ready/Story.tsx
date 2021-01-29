import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Story.css';
import Game from '../Game/Game'
function Story() {
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const [showSkipButton, setShowSkipButton] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);
  const text1: string = `산호는 태어나서 난생 처음 윤지(산호 주인)와 산책을 했다. 
    햇빛이 내리쬐고 바람이 부는 자연을 만끽하면서
    바깥 세상은 신세계라는 것을 깨닫는다. 
    자신이 우물 안 개구리였다는 것을 알게 된 산호는
    윤지를 버리고 가출을 결심한다.`;
  const text2: string = `바깥 세상을 처음 경험해서인지 몇 걸음 가지 않아 길을 잃었고, 
    어느새 산호는 집에서 멀어져 숲을 지나고 있었다.
    그 숲 속에서 스펙타클한 경험을 하게 되는데…!`;
  useEffect((): void => {
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
  return (
    <div className="full-screen">
      <h2>게임 스토리 설명</h2>
      <div className="story-area">
        <div className="only-hidden">
          <div className="storytelling">
            <div className="storytelling-start">
              <div>{text1}</div>{/* 첫 번째 텍스트 */}
            </div>
            {showText && (
              <div className="storytelling-restart">
                <div>{text1}</div>{/* 첫 번째 텍스트 */}
                <br />
                <br />
                <div>{text2}</div>{/* 두 번째 텍스트 */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="moreOrSkip">
        {showMoreButton && <button className="more story-button" onClick={moreStory}>더보기</button>}
        {showSkipButton && <Link to="/ready/character"><button className="skip story-button">SKIP</button></Link>}
      </div>
      <Game />
    </div>
  )
}
export default Story