import React, { useState, useEffect } from 'react'
import { roomSocket } from '../../utils/socket'
import { joinRoom, response } from '../../utils/socket.type'
import { RootState } from '../../redux/rootReducer'
import KakaoProfileButton from './KakaoProfileButton';
import KakaoProfileDelete from './KakaoProfileDelete'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'


declare global {
  interface Window { Kakao: any;}
}

function EditProfile({ setModalOpen }: any ) {
  const [nickInput, nickSetInput] = useState('')
  const userProfile = useSelector((state: RootState) => state.roomReducer.users[0], shallowEqual)
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)
  const dispatch = useDispatch()
  const [accessToken, setAccessToken] = useState<string>('');
  

  const submitRoomData = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault()
    const editUser = Object.assign({}, {
      photoUrl: userProfile.photoUrl,
      nickName: nickInput,
      socketId: userProfile.socketId
    })
    dispatch({
      type: 'SET_PROFILE',
      value: editUser
    })
  }

    roomSocket.onSetProfile((user: any) => {
      console.log('?', user)
      const editUser = Object.assign({}, {
        photoUrl: user.photoUrl,
        nickName: user.nickName,
        socketId: user.socketId
      })
      dispatch({
        type: 'SET_PROFILE',
        value: editUser
      })
    })


  const handleInputNickChange = (ev: { target: { value: string } }) => {
    const { value } = ev.target
    nickSetInput(value)
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    getProfile()
  }, [accessToken]);

  const handleAccToken = (accessToken: string) => {
    setAccessToken(accessToken);
  }

  const getProfile = () => {
    if (accessToken) {
      window.Kakao.Auth.setAccessToken(accessToken);
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (res: any) => {
          const { nickname, thumbnail_image } = res.properties

          const userData = {
            photoUrl: thumbnail_image,
            roomCode: roomCode,
            nickName: nickname,
          }
          roomSocket.emitSetProfile(userData)
        },
        fail: (error: any) => console.log(error)
      })
    }
  }

  return (
    <div>
    <div className="join-room-canvas">
      <div className="title">프로필 설정하기</div>

      <form onSubmit={submitRoomData} className="join-form">

        <div className="join-room-area">
          <div className="join-nickname-content">
            <div className="main-text">닉네임 입력</div>
            <input
                type='text'
                name='nickName'
                minLength={2}
                maxLength={6}
                required
                placeholder='닉네임을 입력하세요'
                title='2~6자리의 닉네임을 입력하세요'
                value={nickInput}
                onChange={handleInputNickChange}
              />
          </div>

          <div className="button-area">
            <input type='submit' value='프로필바꾸기' className="join-button" />
            <button onClick={closeModal}>닫기</button>
          </div> 

        </div>
      </form>
         <KakaoProfileButton handleAccToken={handleAccToken} />
         <KakaoProfileDelete handleAccToken={handleAccToken} />
    </div>
    </div>
  )
}

export default EditProfile