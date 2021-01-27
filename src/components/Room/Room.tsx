import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { roomSocket } from '../../utils/socket'
import Loading from '../Ready/Loading'
import Chat from '../chat/Chat'

import KakaoProfileButton from './KakaoProfileButton'
import KakaoProfileDelete from './KakaoProfileDelete'

interface RoomProps {
  renderRoom: Function
}

function Room({ renderRoom }: RoomProps) {
  const dispatch = useDispatch()
  const usersRef = useRef({})
  const [users, setUsers] = useState({});
  const [accessToken, setAccessToken] = useState<string>('')

  const history = useHistory()
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)

  // 카카오 프로필 불러오기 - 시작
  useEffect(() => {
    console.log('?', roomCode)
    roomSocket.userJoined(roomCode)

    roomSocket.newUserJoined(({ newUser }) => dispatch({ // socket on
      type: 'ADD_USER',
      value: newUser
    }))

    roomSocket.userLeaved(({ socketId }) => { // socket on
      delete usersRef.current[socketId];
      setUsers(users => {
        const { [socketId]: targetPeer, ...restPeers } = users
        if (targetPeer) targetPeer.destroy()
        return restPeers
      })
      dispatch({
        type: 'DELETE_USER',
        value: socketId
      })
    })
    
    roomSocket.onSetProfile((user: any) => {
      console.log(user)
      const editUser = Object.assign({}, { 
        photoUrl: user.photoUrl,
        nickName: user.nickName,
        socketId: user.clientId
      })

      console.log(editUser)
      
      dispatch({
        type: 'SET_PROFILE',
        value: editUser
      })
    })

  }, [])

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
          //dispatch(user url바꾸기),
          const { nickname, thumbnail_image } = res.properties

          const userData = {
            photoUrl: thumbnail_image,
            roomCode: roomCode,
            nickName: nickname,
          }
          console.log('log', userData)
          roomSocket.emitSetProfile( userData )
          },
        fail: (error: any) => console.log(error)
      })
    }
  }
  //- 끝

  return (
    <>
      <div>멀티 유저 대기실</div>
      <KakaoProfileButton handleAccToken={handleAccToken} />
      <KakaoProfileDelete handleAccToken={handleAccToken} />
      <Chat />
      {/* <Loading /> */}
    </>
  );
}

export default Room