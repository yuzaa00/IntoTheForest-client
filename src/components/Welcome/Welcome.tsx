import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import './welcome.css'
import './Background.css';
import video from '../../images/stage-3.mp4'
import axios from 'axios';
import { useDispatch } from 'react-redux';

declare global {
  interface Window { Kakao: any;}
}

function Welcome() {
  const [accessTokenKakao, setAccessToken] = useState<string>('');
  const dispatch = useDispatch()
  
  useEffect(() => {
    getProfile()
  }, [accessTokenKakao]);

  const handleAccToken = (accessTokenKakao: string) => {
    setAccessToken(accessTokenKakao);
  }

  const getProfile = () => {
    if(accessTokenKakao) {
      window.Kakao.Auth.setAccessToken(accessTokenKakao);
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (response: any) => console.log(response),
        fail: (error: any) => console.log(error)})
    }
  }

  const handleAccess = () => {
    axios.post('http://localhost:4000/user')
      .then(res => {
        dispatch({
          type: 'ACCESS_TOKEN',
          value: res.data.accessToken
        })
      })
  }

  return (
    <div>
    <div className="gif-background">
      <div className="dark-background">
      <video className='videovideovideo'
        src={video}
        width='300px'
        autoPlay
        loop
        muted>
        </video>
        <div className="game-title">INTO THE FOREST</div>
        <Link to="/mode" className="game-button" onClick={handleAccess}>
          GAME START
        </Link>
      </div> 
    </div>
    </div>
  );
}

export default Welcome;