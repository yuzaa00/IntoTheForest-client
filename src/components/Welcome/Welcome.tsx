import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import './welcome.css'
import './Background.css';

declare global {
  interface Window { Kakao: any;}
}

function Welcome() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [mouseHover, setMouseHover] = useState<boolean>(false);
  
  //카카오 프로필 불러오기 - 시작
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
    <div className="gif-background">
      <div className="dark-background">
        {/* <img src='images/character/logo.png' className="App-logo" alt="logo" /> */}
        {/* <div className={mouseHover? "game-title hover-white":"game-title"} onMouseOver={() => setMouseHover(true)} onMouseOut={() => setMouseHover(false)}>INTO THE FOREST</div> */}
        <div className="game-title">INTO THE FOREST</div>
        <Link to="/mode" className="game-button">
          GAME START
        </Link>
        {/* <KakaoShareButton/>
        <KakaoProfileButton handleAccToken={handleAccToken} />
        <KakaoProfileDelete handleAccToken={handleAccToken} /> */}
      </div> 
    </div>
  );
}

export default Welcome;