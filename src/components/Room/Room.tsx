import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { roomSocket } from '../../utils/socket';

import KakaoProfileButton from './KakaoProfileButton'
import KakaoProfileDelete from './KakaoProfileDelete'

function Room() {
  const [accessToken, setAccessToken] = useState<string>('');
  
  const history = useHistory()
  
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
    <>
    <div>멀티 유저 대기실</div>
    <KakaoProfileButton handleAccToken={handleAccToken} />
    <KakaoProfileDelete handleAccToken={handleAccToken} />
    </>
  );
}

export default Room;