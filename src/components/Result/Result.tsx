import React, { useState, useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { roomSocket } from '../../utils/socket'
import KakaoShareButton from './KakaoShareButton'

declare global {
  interface Window { Kakao: any;}
}

function Result() {
  roomSocket.listenResult((userList: any) => {
    console.log(userList.gameResult)
  })
  

  return (
    <>
    <div>결과 화면</div>
    <KakaoShareButton/>
    </>
  );
}

export default Result;