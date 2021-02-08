import React from 'react';
import { useHistory } from 'react-router-dom';
import './Ending.css';


function Ending () {
  const history = useHistory();
  const onAgainStartBack = () => {
    history.push("/")  
  } 
  
  return (
    <div style={{width: '100%', height: '100vh', background: 'linear-gradient(75deg,#755bea,#ff72c0)', display: 'flex'}}>
    <div className="ending-screen"> 
      <div className="ending-wrapper">
       <div className="scroll-text">
       <h1>IN TO THE FOREST</h1>
        <p>Episode I</p>
        <h2>숲속은 위험해!!</h2>

        <p>몽몽이는 공원에서부터 숲을 넘어 56km를 걸어 무려 9일 만에 집으로 무사히 돌아왔다.</p>
        <p>주인 송씨는 "다시 몽몽이를 볼 수 없을 거라고 생각했다"며 "이렇게 다시 볼 수 있게 돼 너무나 기쁘다"고 감격스러워했다.</p>     
        <p>몽몽이는 긴 여행에 지쳤는지 밥을 먹고 오랜시간 소파에 누워 잠을 청했다.</p>
        <p>마치 아무일도 없었던 듯이.</p>
        <p>하지만 내일 아침 어디론가 또 사라진 몽몽....</p>

        <h2>CREW</h2>
        <dl className="credits__double">
          <dt>해실이</dt>
          <dd>사실은 강아지 무서워합니다.</dd>
          <dt>또덩이</dt>
          <dd>할 말이 없어요.</dd>
          <dt>재지니</dt>
          <dd>강아지 2마리 키웁니다.</dd>
          <dt>산호누나</dt>
          <dd>하루에 한번씩 산책시킵니다.</dd>
        </dl>

        <h2>Special Thanks</h2>
        <h2>Music</h2>
        <ul className="credits__inline">
          <li>CC0 1.0 Universal made by DayDreamSound
https://youtu.be/kfnh9QAfDgA</li>
          <li>Thanks to, KevanGC
From: http://soundbible.com/1645-Pling.html</li>
          <li>Distributor: 저작권 걱정없는 유튜브용 음원 & 무료 효과음 서비스 ‘뮤팟’
https://www.mewpot.com</li>
          <li>YouTube 브금대통령</li>
        </ul>

        <h2>Picture</h2>
        <ul className="credits__inline">
          <li><a href="https://kr.lovepik.com/images/png-game.html">게임 Png vectors by Lovepik.com</a>
</li>
          <li>어반브러쉬</li>
          <li>google.com</li>
        </ul>
        <p>덕분에 성공적으로 프로젝트를 마무리 할 수 있었습니다. 무한한 감사의 말씀 올립니다.</p>
        
        <h2>마지막으로</h2>
        <p>코드스테이츠 임직원 여러분께 감사합니다.</p>

      
       </div>
      </div>
      <div className="againStartBack">
          <button className="btnAgainStart" onClick={onAgainStartBack}>다시하기</button>
        </div> 
        <div>
        <button className="btnAgainStart1" onClick={() => history.push('/SingleResult')}>랭킹으로</button>
        </div>
    </div>
    </div>
  );
}

export default Ending;
