import React, { useState, useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { roomSocket } from '../../utils/socket'
import KakaoShareButton from './KakaoShareButton'
import './Result.css'

function Result() {
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)
  const [scoreList, setScoreList] = useState([])

  roomSocket.listenResult((userList: any) => {
    setScoreList(userList)
  })

 return (
  <div>
    <div className='kakao_share'>
    <KakaoShareButton></KakaoShareButton>
    </div>
    {scoreList.map((user: any, idx: number) => (
      <div className='MRcontainer' key={idx}>
        <span className='MRcontent' style={{ position: 'relative', right: `${idx + 20 * idx}px`}}>닉네임: {user.nickName}</span>
        <span className='MRcontent' style={{ right: `${idx + 20 * idx}px`}}>점수: {user.gameResult.score}</span>
        <span className='MRcontent' style={{ right: `${idx + 20 * idx}px`}}>스테이지: {user.gameResult.stage}</span>
        <span className='MRcontent' style={{ right: `${idx + 20 * idx}px`}}>서브 캐릭터: {user.gameResult.squi + user.gameResult.bird}</span>
      </div>
    ))}
  </div>
  )
}

export default Result


 

