import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useBeforeunload } from 'react-beforeunload';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { roomSocket, peerSocket } from '../../utils/socket'
import { ToastContainer, toast } from 'react-toastify'
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css'
import Video, { StyledVideo } from './video'
import * as controlStream from '../../utils/controlStream'
import Peer from 'simple-peer'
import { store } from '../../index'

import Game from '../Game/Game'
import UtilityBox from './UtilityBox'
import ChoiceCharacter from '../../components/Ready/ChoiceCharacter'
import Loading from '../Ready/Loading'
import Chat from '../chat/Chat'
import Start from './Start'
import Result from '../Result/Result'
import RoomInfo from './RoomInfo'

import './Room.css'
import { JsxEmit } from 'typescript';

interface RoomProps {
  renderRoom: Function
}

interface user {
  nickName: string
  socketId: string
  photoUrl: string
}

interface userList {
  userList: user[]
  clientId: string
}

function Room({ renderRoom }: RoomProps) {
  useBeforeunload((event) => event.preventDefault());
  const dispatch = useDispatch()
  const [scoreList, setScoreList] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [error, setError] = useState('')
  const [peers, setPeers] = useState({})
  const [test, setTest] = useState(false)
  const peersRef = useRef<any>({})
  const myVideoRef = useRef<any>()
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)
  const userList = useSelector((state: RootState) => state.roomReducer.users, shallowEqual)
  const mySocketId = useSelector((state: RootState) => state.roomReducer.mySocketId, shallowEqual)
  const openResult = useSelector((state: RootState) => state.roomReducer.openResult, shallowEqual)
  const isVideo = useSelector((state: RootState) => state.roomReducer.isVideo, shallowEqual)
  const userPhotoUrl = useSelector((state: RootState) => state.roomReducer.currentUser.photoUrl, shallowEqual)
  const dataAWS = store.getState().roomReducer.isGameStart

  useEffect(() => {
    toast.info('🦄 방에 입장하셨습니다.', {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    roomSocket.userJoined(roomCode)
    roomSocket.userJoinedOn(async ({ userList, clientId }: userList) => {
      if (store.getState().roomReducer.currentUser.socketId !== clientId) {
        const user = userList.filter((user: user) => user.socketId === clientId)
        toast.success(`🦄 ${user[0].nickName} 님이 입장하셨습니다!`, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
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
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    })
    
    roomSocket.listenGameStart(handleIsStart)

    roomSocket.listenResult(handleIsStart)

    return () => {
      roomSocket.leaveRoom(roomCode);
      roomSocket.cleanUpRoomListener();
      setIsStreaming(false)
      controlStream.remove();
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
  }, [isStreaming])

  function handleIsStart() {
    if(!store.getState().roomReducer.isHost) {
      setIsStart(true)
      dispatch({
        type: 'IS_GAME_START'
      })
      return
    }
    setIsStart(true)
    dispatch({
      type: 'IS_GAME_START'
    })
  }

  return (
    <Container>
      <RoomInfo />
      <UtilityBox />
      <ToastContainer />
      {isStart && <Loading />}
      <Chat />
      <div className='capture'>
        <div className={isStart ? 'room_video_game_start' : 'room_video'}>
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
        </div>
      {!isStart && <Start callback={handleIsStart} />}
      {openResult && <Result />}
    </div>
    </Container>
  );
  
}


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(76deg
    ,#00BCD4,#77EDAC);

  & > button {
    z-index: 999;
    width: 36px;
    height: 36px;
    padding: 12px;
    position: fixed;
    bottom: 50px;
    right: 60px;
    text-align: center;
  }
`;



// h3 : 영상 하단 닉네임 
const UserVideoListMap = styled.div`
margin: 20px;
margin-top: 0px;
margin-bottom: 0px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: relative;

h3 {
  margin-top: 24px;
  font-size: 20px;
  color: white;
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