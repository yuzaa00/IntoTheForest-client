import React, { useEffect } from 'react'

const KakaoShareButton = () => {
  useEffect(() => {
    createShareButton()
  }, [])
x
  const createShareButton = () => {
    
    if(window.Kakao) {
      const kakao = window.Kakao
      
      if(!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY)}

      kakao.Link.createCustomButton({
        container: '#kakao-link-btn',
        templateId: 45164,
        templateArgs: {
          'name': '윤지',
          'image': 'image'
        }      
      })
    }
  }

  return (
    <div>
      <button id="kakao-link-btn">
        카카오로 공유하기
      </button>
    </div>
  )
}

export default KakaoShareButton