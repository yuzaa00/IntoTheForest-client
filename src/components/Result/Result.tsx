import React, { useState, useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';

import KakaoShareButton from './KakaoShareButton'

declare global {
  interface Window { Kakao: any;}
}

function Result() {

  return (
    <>
    <div>결과 화면</div>
    <KakaoShareButton/>
    </>
  );
}

export default Result;