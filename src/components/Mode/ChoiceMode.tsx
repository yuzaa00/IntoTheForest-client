import React, { Component, useState, ReactElement, ReactNode, FC, ReactChild } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import './ChoiceMode.css';
import Story from '../Ready/Story';
import { JsxChild, JsxElement } from 'typescript';
import Modal from './Modal'
import { roomSocket } from '../../utils/socket';
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';

interface roomData {
  roomCode: string
  maxNum: number
}

interface response {
  roomId?: string
  error?: string
}

const ChoiceMode = () => {

  const [modeClick, setModeClick] = useState('');
  const [modeHover, setModeHover] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalComponents, setmodalContent] = useState(null);
  const history = useHistory();

  const soloMode = () => {
    const text = '솔로 모드';
    setModeClick(text);
    setModeHover(text);
  }

  const multiModeCreateRoom = () => {
    const text = '멀티 모드: 방 만들기';
    setModeClick(text);
    setModeHover(text);
  }

  const multiModeGoRoom = () => {
    const text = '멀티 모드: 방에 참가하기';
    setModeClick(text);
    setModeHover(text);
  }

  const moveToRoom = (response: response) => {
    const { roomId, error } = response
    if(!roomId) console.log('에러임', error) 
    else {
      console.log('정상임')
      history.push(`rooms/${roomId}`)
    } 
  };

  const joinRoom = (roomData: roomData) => {
    roomSocket.joinRoom({ roomData }, (roomId: response) => moveToRoom(roomId))
  }

  const createRoom = (roomData: roomData) => {
    roomSocket.createRoom({ roomData }, (roomId: response) => moveToRoom(roomId))
  }
  
  const openModal = (modalComponents: any) => {
    setmodalContent(modalComponents)
    setModalOpen(true)
  }

  return (
    <div className="game-size" onMouseOut={() => setModeHover('')}>
      <div className="mode">
        <div className="mode-solo">
          <div className="mode-name">
            솔로
                            </div>
          <button
            onClick={() => history.push('/ready/story')}
            onMouseOver={soloMode}
            className="button-design">
            혼자하기
                                    </button>
        </div>
        <div className="mode-multi">
          <div className="mode-name">멀티</div>
          <button
            onClick={() => openModal(<CreateRoomForm onSubmit={createRoom} />)}
            onMouseOver={multiModeCreateRoom}
            className="multi-create button-design"
          >
            방 생성
                            </button>
          <button
            onClick={() => openModal(<JoinRoomForm onSubmit={joinRoom} />)}
            onMouseOver={multiModeGoRoom}
            className="multi-join button-design"
          >
            방 참가
                            </button>
        </div>
      </div>
      {isModalOpen &&
          <Modal setModalOpen={setModalOpen}>{modalComponents}</Modal>
      }
      <div className="text">
        {modeHover === null ?
          <div className="choiceMode">모드를 선택하세요</div>
          :
          <div className="choiceMode">{modeHover}</div>
        }
        <Link to="/">
          <div className="exit" onMouseOver={() => setModeHover("정말로 나가시겠습니까?")}>
            나가기
                            </div>
        </Link>
      </div>
    </div>
  )
}

export default ChoiceMode;
