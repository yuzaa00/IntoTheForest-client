import React, { useState, useEffect  }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { roomSocket } from '../../utils/socket'
import KakaoShareButton from './KakaoShareButton'

declare global {
  interface Window { Kakao: any;}
}

function Result() {
  const [scoreList, setScoreList] = useState([])
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)

  const result = {
    roomCode: roomCode,
    result: {
      score: 1000,
      life: 0,
      stage: 3,
      bird: 1,
      squi: 2,
    }
  }
  
  useEffect(() => {
    setScoreList([{
      gameResult: {
        score: 1000,
        stage: 3,
        bird: 2,
        squi: 1
      },
    },
    {
      gameResult: {
        score: 1000,
        stage: 3,
        bird: 2,
        squi: 1
      },
    },
    {
      gameResult: {
        score: 1000,
        stage: 3,
        bird: 2,
        squi: 1
      },
    },
    {
      gameResult: {
        score: 1000,
        stage: 3,
        bird: 2,
        squi: 1
      },
    }
  ])
    roomSocket.listenResult((userList: any) => {
      console.log('----------Result-------------',userList)
      
    })
  }, [])

  return (
    <>
    <div>결과 화면</div>
    {scoreList.map((ele, idx) => (
      console.log(idx,'번째', ele),
      <div key={idx}>
        <span>점수: {ele.gameResult.score}</span>
        <span>스테이지: {ele.gameResult.stage}</span>
        <span>서브캐릭터: {ele.gameResult.bird + ele.gameResult.squi}</span>
      </div>
    ))}
    <KakaoShareButton/>
    </>
  );
}

export default Result;