import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import styled from 'styled-components'
import { roomSocket, peerSocket } from '../../utils/socket'
import { store } from '../../index'

interface listen {
  socketId: string
  start: string
}

function Start () {
  const disPatch = useDispatch()
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)
  
  roomSocket.listenStart(({socketId, start}: listen) => {
    console.log('start는 받았는데 나는 ', store.getState().roomReducer.mySocketId === socketId, '임')
    if(store.getState().roomReducer.mySocketId === socketId) {
      disPatch({
        type: ''
      })
    }
  })

  return (
    <Circle onClick={() => roomSocket.sendReady(roomCode)}>
      Ready
    </Circle>
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