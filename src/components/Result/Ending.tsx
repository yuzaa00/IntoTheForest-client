import React from 'react';
import { useHistory } from 'react-router-dom';
import './Ending.css';


function Ending () {
  const history = useHistory();
  const onAgainStartBack = () => {
    history.push("/")  
  } 
  
  return (
    <div className="ending-screen"> 
      <div className="ending-wrapper">
        <div className="scroll-text">
          <h1>[ INTO THE FOREST ]</h1>
            <h2/>
            <p>몽몽이는 무려 9일 만에 집으로 돌아왔다.</p>
            <p>주인 송씨는 "이렇게 다시 볼 수 있게 돼 너무나 기쁘다"며 감격스러워했다.</p>     
            <p>몽몽이는 긴 여행에 지쳤는지 밥을 먹고 오랜시간 소파에 누워 잠을 청했다.</p>
            <p>마치 아무일도 없었던 듯이..</p>
            <h2/>
            <p>그러나 다음날 아침 또 사라진 몽몽....?!</p>
            <h2/>
          <h1>[ THANKS TO ]</h1>
            <h2>Music</h2>
              <ul className="credits__inline">
              <li>CC0 1.0 Universal made by DayDreamSound (https://youtu.be/kfnh9QAfDgA)</li>
              <li>Thanks to, KevanGC From http://soundbible.com/1645-Pling.html</li>
              <li>Distributor: 저작권 걱정없는 유튜브용 음원 & 무료 효과음 서비스 ‘뮤팟’ (https://www.mewpot.com)</li>
              <li>YouTube 브금대통령</li>
              </ul>
            <h2>Drawing</h2>
              <ul className="credits__inline">
              <li>게임 Png vectors by Lovepik.com</li>
              <li>(https://kr.lovepik.com/images/png-game.html)</li>
              <li>어반브러쉬</li>
              <li>google</li>
              </ul>
            <h2/>
            <p>위 분들의 넓은 아량으로 한결 수월한 개발을 할 수 있었습니다</p>
            <p>감사합니다</p>
            <h2/>
          <h1>[ DEVELOPER ]</h1>
            <dl className="credits__double">
            <dt>해실이</dt><dd>사실은 강아지 무서워합니다</dd>
            <dt>또덩이</dt><dd>할 말이 없어요</dd>
            <dt>재지니</dt><dd>강아지 2마리 키웁니다</dd>
            <dt>주인송씨</dt><dd>하루에 한번씩 산책시킵니다</dd>
            </dl>
          <h2></h2>
          <h2>SPECIAL THANKS</h2>
            <p>코드스테이츠</p>
        </div>
      </div>
      <div className="againStartBack">
        <button className="btnAgainStart" onClick={onAgainStartBack}>다시하기</button>
      </div> 
      <div>
        <button className="btnAgainStart1" onClick={() => history.push('/SingleResult')}>랭킹으로</button>
      </div>
    </div>
  );
}

export default Ending;
