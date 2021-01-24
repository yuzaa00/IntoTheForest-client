import { useEffect } from 'react'

type ProfileProps = {
  handleAccToken: (accessToken: string) => void
}

const KakaoProfileDelete: any = ( { handleAccToken }: ProfileProps ) => {

  const deleteProfile = async () => {
    if(window.Kakao) {
      const kakao = window.Kakao
      
      if(!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY)}
      
      kakao.API.request({
        url: '/v1/user/unlink',
        success: () => console.log('ok'),
        fail: (error: any) => console.log(error)
      })

      handleAccToken('')
    }
  }
  
  return (
    <div>
      <button onClick={deleteProfile}>
        카카오 연결 해지하기
      </button>
    </div>
  )
}

export default KakaoProfileDelete