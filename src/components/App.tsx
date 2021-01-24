import React, { useState, useEffect }from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Game from './Game'
import ChoiceMode from './ChoiceMode';

import KakaoShareButton from './kakaoShareButton';
import KakaoProfileButton from './kakaoProfileButton';
import KakaoProfileDelete from './kakaoProfileDelete';

import { useSelector, useDispatch } from 'react-redux';

declare global {
  interface Window { Kakao: any;}
}

function App() {
  const [count, setCount] = useState(0);
  const [accessToken, setAccessToken] = useState<string>('');
  
  useEffect(() => {
    getProfile()
  }, [accessToken]);

  const handleAccToken = (accessToken: string) => {
    setAccessToken(accessToken);
  }

  const getProfile = () => {
    if(accessToken) {
      window.Kakao.Auth.setAccessToken(accessToken);
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (response: any) => console.log(response),
        fail: (error: any) => console.log(error)})
    }
  }

  return (
    <ChoiceMode />
    // count ? <div><Game></Game></div> :
    // <div className="App">
    //   <header className="App-header">
    //     <img src='images/character/logo.png' className="App-logo" alt="logo" />
    //     <button onClick={()=> setCount(1)}>
    //       Game Start!!!
    //     </button>
    //     <KakaoShareButton/>
    //     <KakaoProfileButton handleAccToken={handleAccToken} />
    //     <KakaoProfileDelete handleAccToken={handleAccToken} />
    //   </header> 
    // </div>
  );
}

export default App;