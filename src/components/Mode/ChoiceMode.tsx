import React, { Component, useState, ReactElement, ReactNode, FC, ReactChild, useEffect } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import './ChoiceMode.css';
import Story from '../Ready/Story';
import Modal from './Modal'
import { roomSocket } from '../../utils/socket';
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';

const ChoiceMode = () => {
  const [modeClick, setModeClick] = useState('')
  const [modeHover, setModeHover] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalComponents, setmodalContent] = useState(null)
  const history = useHistory()

  useEffect(() => {
    document.body.style.zoom = 1
  })

  const soloMode = () => {
    const text = '솔로 모드'
    setModeClick(text)
    setModeHover(text)
  }

  const multiModeCreateRoom = () => {
    const text = '멀티 모드: 방 만들기'
    setModeClick(text)
    setModeHover(text)
  }

  const multiModeGoRoom = () => {
    const text = '멀티 모드: 방에 참가하기'
    setModeClick(text)
    setModeHover(text)
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
            onClick={() => history.push('/ready/loading')}
            onMouseOver={soloMode}
            className="button-design">
            혼자하기
                                    </button>
        </div>
        <div className="mode-multi">
          <div className="mode-name">멀티</div>
          <button
            onClick={() => openModal(<CreateRoomForm setModalOpen={setModalOpen}/>)}
            onMouseOver={multiModeCreateRoom}
            className="multi-create button-design"
          >
            방 생성
                            </button>
          <button
            onClick={() => openModal(<JoinRoomForm setModalOpen={setModalOpen} />)}
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
        {modeHover === '' ?
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
          // <Modal setModalOpen={setModalOpen}><CreateRoomForm /></Modal>
  )
}

export default ChoiceMode
