import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import styled from 'styled-components'
import { roomSocket, peerSocket } from '../../utils/socket'
import { store } from '../../index'
import './Start.css'

interface listen {
  socketId: string
  start: string
}

function Start ({ callback }: any) {
  const [ toggle, setToggle ] = useState(false)
  const [ isReady, setIsReady ] = useState(false)
  const disPatch = useDispatch()
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)
  
  roomSocket.listenStart(({socketId, start}: listen) => {
    console.log('socketId :', socketId, 'start :', start, 'isHost : ', store.getState().roomReducer.isHost)
    console.log('start는 받았는데 나는 ', store.getState().roomReducer.isHost === socketId, '임')
    if(store.getState().roomReducer.isHost === socketId) {
      setToggle(true)
    }
  })

  return !toggle ? 
  (
  <>
    <div className="start_button" onClick={() => {
      callback()
    }}>
      Game 
      Start
    </div>
  </>
  )
   :  (
    <div className="ready_button" onClick={() => {
      if(!isReady) roomSocket.sendReady(roomCode)
      setIsReady(true)
    }}>
      Ready
    </div>
  )

}

const Circle = styled.div`
width: 20px;
height: 20px;
position: absolute;
top: 38%;
right: 29%;
display: flex;
-webkit-box-pack: center;
justify-content: center;
-webkit-box-align: center;
align-items: center;
border-radius: 50%;
font-size: 69px;
background-color: red;
color: white;
padding-left: 137px;
padding-top: 137px;
padding-right: 137px;
padding-bottom: 137px;
font-style: oblique;
font-weight: 300;
box-shadow: 10px 5px 5px #341212;
text-shadow: -1px 3px 29px white, 0 0 6em blue, 0 0 11.2em blue;
`;

export default Start;