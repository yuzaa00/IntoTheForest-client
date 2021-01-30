import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { roomSocket } from '../../utils/socket'
import { RootState } from '../../redux/rootReducer'
import KakaoProfileButton from './KakaoProfileButton';
import KakaoProfileDelete from './KakaoProfileDelete'
import styled from 'styled-components';
import './EditProfile.css'

declare global {
  interface Window { Kakao: any; }
}

function EditProfile({ setModalOpen }: any) {
  const [nickInput, nickSetInput] = useState('')
  const userProfile = useSelector((state: RootState) => state.roomReducer.users[0], shallowEqual)
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)
  const [kakao, setKakao] = useState(true)
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
          setKakao(false)
        },
        fail: (error: any) => console.log(error)
      })
    }
  }

  const deleteKakao = () => {
    setKakao(true)
  }

  return (
    <Wrapper>
      <Margin >
        <div className='EPcontainer'>프로필 설정하기</div>
          <form onSubmit={submitRoomData}>
            <div className='EPinput'>
              <div className='EPnickname'>닉네임</div>
              <input 
                className='EPNickInput'
                type='text'
                name='nickName'
                minLength={2}
                maxLength={6}
                required
                placeholder='닉네임을 입력하세요'
                value={nickInput}
                onChange={handleInputNickChange}
              />
            </div>
            <div className='EPsubmit'>
              <input type='submit' value='프로필바꾸기' className='NickSubmit' />
              {kakao ? 
              <KakaoProfileButton handleAccToken={handleAccToken} /> :
              <KakaoProfileDelete handleAccToken={handleAccToken} deleteKakao={deleteKakao} /> }
            </div>
              <button className='NickSubmit' onClick={closeModal}>닫기</button>
            
            </form>
      </Margin>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  
  z-index: 25;
  height: 40%;
  width: 20%;
  position: absolute;
  display:flex;
  align-items: center;
  justify-content: center;
  right: 40%;
  bottom: 45%;
  border-radius: 24px;
  overflow: hidden;
  background: #77EDAC;
`;

const Margin = styled.div`
  margin: 20px;
  justify-content: center;
  align-items: center;
  font-family: 'BMDOHYEON';
  font-size: 30px;
  color: white;
  text-align: center;

  .EPcontainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin: 10px;
    margin-bottom: 20px;
  }
  .EPinput {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 15px;
  }
  .EPsumbmit {
    display:flex;
    flex-direction: row;
  }
  .EPnickname {
    font-size: 20px;
    margine: 10px;
    padding: 10px;
  }
  .EPNickInput {
    background: white;
    padding: 10px;
    border-radius: 10px;
  }
  .NickSubmit {
    background-color: white;
    border-radius: 15px;
    font-family: 'BMDOHYEON';
    font-size: 15px;
    color: #77EDAC;
    margin: 10px;
    padding: 10px;
  }
  .NickSubmit:hover {
    background-color: #00BCD4;
    color: white;
  }
  
`


export default EditProfile