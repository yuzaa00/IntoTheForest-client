import { useEffect } from 'react'
import './Kakaobutton.css'

type ProfileProps = {
  handleAccToken: (accessToken: string) => void
  deleteKakao: () => void
}

const KakaoProfileDelete: any = ( { handleAccToken, deleteKakao }: ProfileProps ) => {
  
  const deleteProfile = async () => {
    if(window.Kakao) {
      const kakao = window.Kakao
      
      if(!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY)}
      
      kakao.API.request({
        url: '/v1/user/unlink',
        success: () => alert('🌼카카오 연동이 해지되었습니다🌼'),
        fail: (error: any) => console.log(error)
      })

      handleAccToken('')
      deleteKakao()
    }
  }
  
  return (
    <div>
      <button className='loadkprofile' onClick={deleteProfile}>
        카카오 연결 해지하기
      </button>
    </div>
  )
}

export default KakaoProfileDelete