import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import './welcome.css'

declare global {
  interface Window { Kakao: any;}
}

function Welcome() {
  const [accessToken, setAccessToken] = useState<string>('');
  
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
  //- 끝

  return (
    <div className="App">
      <header className="App-header">
        <img src='images/character/logo.png' className="App-logo" alt="logo" />
        <Link to='/mode'>
          Start
        </Link>
        <Link to='/game'>
          Game Start!!!
        </Link>
        {/* <KakaoShareButton/>
        <KakaoProfileButton handleAccToken={handleAccToken} />
        <KakaoProfileDelete handleAccToken={handleAccToken} /> */}
      </header> 
    </div>
  );
}

export default Welcome;