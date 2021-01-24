import React, { useState }from 'react';

type ProfileProps = {
  handleAccToken: (accessToken: string) => void
}

const KakaoProfileButton = ( { handleAccToken }: ProfileProps ) => {

  const createProfile = () => {
    if(window.Kakao) {
      const kakao = window.Kakao
      
      if(!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY)}
      
      type AuthRes = {access_token: string}

      kakao.Auth.login({
        success: (res: AuthRes) => handleAccToken(res.access_token),
        fail: (err : any) => console.log(err) })
    }
  }

  return (
    <div>
      <button onClick={createProfile}>
        카카오 프로필 가져오기
      </button>
    </div>
  )
}

export default KakaoProfileButton