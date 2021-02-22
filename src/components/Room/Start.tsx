import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import styled from 'styled-components'
import { roomSocket } from '../../utils/socket'
import { store } from '../../index'
import { ToastContainer, toast } from 'react-toastify'
import './Start.css'

interface listen {
  socketId: string
  start: string
}

function Start({ callback }: any) {
  const [toggle, setToggle] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const userList = useSelector((state: RootState) => state.roomReducer.users)
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode)

  roomSocket.listenStart(({ socketId, start }: listen) => {
    if (store.getState().roomReducer.isHost === socketId) {
      setToggle(true)
    }
  })

  return toggle ?
    (
      <>
        <div className="start_button" onClick={() => {
          toast.success(`🦄 게임을 시작합니다. `, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          roomSocket.sendStart(roomCode)
          callback()
        }}>
          GAME
          START
    </div>
      </>
    )
    : (
      <div className={isReady ? "ready_button_clicked" : "ready_button"} onClick={() => {
        if (userList.length < 4) {
          toast.error(`🦄 4명이 모여야 준비가 가능합니다.`, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
          return
        }
        if (!isReady) roomSocket.sendReady(roomCode)
        setIsReady(isReady)
      }}>
        READY
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