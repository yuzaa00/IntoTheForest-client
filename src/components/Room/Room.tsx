import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/rootReducer'
import { roomSocket } from '../../utils/socket'

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
    roomSocket.userJoined({roomCode: roomCode}, async ({ roomId, error }) => { //socket emit
      console.log(roomId, error)
      dispatch({
        type: 'RENDER_ROOM',
        value: roomId
      })
    })

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
        success: (response: any) => console.log(response),
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
    </>
  );
}

export default Room