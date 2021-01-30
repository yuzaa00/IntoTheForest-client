import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useBeforeunload } from 'react-beforeunload';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { roomSocket, peerSocket } from '../../utils/socket'
import { ToastContainer, toast } from 'react-toastify'
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../Ready/Loading'
import Chat from '../chat/Chat'
import Video, { StyledVideo } from './video'
import * as controlStream from '../../utils/controlStream'
import Peer from 'simple-peer'
import { store } from '../../index'

import Game from '../Game/Game'
import UtilityBox from './UtilityBox'
import ChoiceCharacter from '../../components/Ready/ChoiceCharacter'
import KakaoProfileButton from './KakaoProfileButton'
import KakaoProfileDelete from './KakaoProfileDelete'


interface RoomProps {
  renderRoom: Function
}

interface user {

  nickName: string
  socketId: string
  photoUrl: string

}

function Room({ renderRoom }: RoomProps) {
  useBeforeunload(() => {"새로고침시 방을 나가게 됩니다"})
  const dispatch = useDispatch()
  const usersRef = useRef({})
  const [users, setUsers] = useState({});
  const [accessToken, setAccessToken] = useState<string>('')

  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  const [peers, setPeers] = useState({});
  const peersRef = useRef<any>({})
  const myVideoRef = useRef<any>()

  const history = useHistory()
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)
  const userList = useSelector((state: RootState) => state.roomReducer.users, shallowEqual)
  const mySocketId = useSelector((state: RootState) => state.roomReducer.mySocketId, shallowEqual)

  useEffect(() => {
    toast.info('🦄 방에 입장하셨습니다.', {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

    roomSocket.userJoined(roomCode)
    roomSocket.userJoinedOn(async ({ userList, clientId }: any) => {
        dispatch({ // socket on
        type: 'ADD_USER',
        value: userList
      })
      dispatch({ // socket on
        type: 'ADD_MY_SOCKET_ID',
        value: clientId
      })
      try {
        const stream = await controlStream.init()
        myVideoRef.current.srcObject = stream
        setIsStreaming(true)
      } catch (error) {
        setError(error.message)
      }
      
    })
    
    roomSocket.listenUserLeaved(({ socketId }) => { // socket on
      delete peersRef.current[socketId]
      setPeers(peers => {
        delete peers[socketId]
        return peers        
      })
      dispatch({
        type: 'DELETE_USER',
        value: socketId
      })
      toast.error(`🦄 ${store.getState().roomReducer.users.filter(user => user.socketId === socketId)[0].nickName} 님이 떠나셨습니다.`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
    })

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

    return () => {
      roomSocket.leaveRoom(roomCode);
      roomSocket.cleanUpRoomListener();
      setIsStreaming(false)
      controlStream.remove();
      console.log(5)
    };
  }, [])

  useEffect(() => {
    if (!isStreaming) return
    
    userList.forEach((user, idx) => {
      if (mySocketId !== user.socketId) {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: controlStream.get(),
        });
        peer.on('signal', signal => {
          peerSocket.sendingSignal({ signal, receiver: user, roomCode: roomCode })
        })
        peersRef.current[user.socketId] = peer
        setPeers(prev => ({ ...prev, [user.socketId]: peer }))
      }
    })

    peerSocket.listenSendingSignal(({ initiator, signal }) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: controlStream.get(),
      });
      peer.signal(signal)

      peer.on('signal', signal => {
        peerSocket.returnSignal({ signal, receiver: initiator, roomCode: roomCode });
      });

      peersRef.current[initiator.socketId] = peer
      setPeers(prev => ({ ...prev, [initiator.socketId]: peer }));
    });

    peerSocket.listenReturningSignal(({ returner, signal }) => {
      const peer = peersRef.current[returner.socketId];
      peer.signal(signal);
    });

    return () => {
      peerSocket.cleanUpPeerListener();
    };
  }, [isStreaming]);

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
          roomSocket.emitSetProfile(userData)
        },
        fail: (error: any) => console.log(error)
      })
    }
  }

  return (
    <Container>
      <div>멀티 유저 대기실</div>
      <ToastContainer />
      <KakaoProfileButton handleAccToken={handleAccToken} />
      <KakaoProfileDelete handleAccToken={handleAccToken} />
      {/* <ChoiceCharacter /> */}
      <Chat />
      <UserVideoList>
      {userList.map((user, idx) => (
       <UserVideoListMap key={idx}>
          {user.socketId === userList[0].socketId ?
            <StyledVideo
              ref={myVideoRef}
              autoPlay
              playsInline
              muted
            />
            :
            <Video
              peer={peers[user.socketId]}
            />
          }
          <h3>{user.nickName}</h3>
        </UserVideoListMap>
      ))}
      </UserVideoList>
      <UtilityBox />
    </Container>
  );
}


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(90deg
    ,#755BEA,#FF72C0);

  & > button {
    z-index: 999;
    width: 36px;
    height: 36px;
    padding: 12px;
    position: fixed;
    bottom: 24px;
    right: 100px;
    text-align: center;
  }
`;

const UserVideoList= styled.div`
width: 80vw;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
overflow-y: scroll;

&::-webkit-scrollbar {
  display: none;
}
`;

const UserVideoListMap = styled.div`
position: relative;
margin: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: relative;

h3 {
  margin-top: 24px;
  font-size: 18px;
  color: ${({ theme }) => theme.orange};
}

img {
  z-index: 20;
  position: absolute;
  top: -94px;
  left: -2px;
  width: 129%;
}

img.explosion {
  left: -36px;
  mix-blend-mode: screen;
}
`;

const userListSet = styled.div`

`;

const userBlock = styled.div`
  position: relative;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h3 {
    margin-top: 24px;
    font-size: 18px;
    color: ${({ theme }) => theme.orange};
  }

  img {
    z-index: 20;
    position: absolute;
    top: -94px;
    left: -2px;
    width: 129%;
  }

  img.explosion {
    left: -36px;
    mix-blend-mode: screen;
  }
`;


export default Room