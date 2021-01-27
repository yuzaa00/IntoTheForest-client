import React, { useState } from 'react'
import { roomSocket } from '../../utils/socket'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { roomData, response } from '../../utils/socket.type'
import crypto from 'crypto'
import './CreateRoom.css';

function CreateRoomForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [createError, setCreateError] = useState('')
  const [inputs, setInputs] = useState({
    roomCode: '',
    nickName: '',
    maxNum: 2,
  })
  console.log(inputs)

  const moveToRoom = (response: response) => {
    const { roomId, clientId, error } = response

    if (!roomId) {
      setCreateError(error)
    }
    else {
      dispatch({
        type: 'RENDER_ROOM',
        roomId: roomId,
        roomCode: inputs.roomCode,
        user: {
          nickName: inputs.nickName || crypto.randomBytes(3).toString("hex"),
          socketId: clientId,
          photoUrl: '../../images/card/card5.png'
        }
      })
      history.push(`rooms/${roomId}`)
    }
  }

  const createRoom = (roomData: roomData) => {
    roomSocket.createRoom(roomData, (roomId: response) => moveToRoom(roomId))
  }


  const submitRoomData = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault()
    const { roomCode, maxNum, nickName } = inputs
    createRoom({ roomCode, nickName, maxNum: maxNum })
  }

  const handleInputChange = (ev: { target: { value: string, name: string } }) => {
    const { name, value } = ev.target
    setInputs(prev => ({ ...prev, [name]: value }))
  };

  const handleChangeNickname = (ev: any) => {
    const { name, value } = ev.target
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="create-room-canvas">
      <div className="title">방 만들기</div>
      <div className="subtitle">2인, 4인이 함께 게임을 즐겨보세요!</div>
      <form onSubmit={submitRoomData}>
        <div className="people">
          <div onClick={() => setInputs(prev => ({ ...prev, maxNum: 2 }))}>2인</div>
          <div onClick={() => setInputs(prev => ({ ...prev, maxNum: 4 }))}>4인</div>
        </div>

        <div className="create-room-area">
          <div className="create-room-content">
            <div>방 코드 설정 <span>필수</span></div>
            <input
              type='text'
              name='roomCode'
              minLength={2}
              maxLength={6}
              value={inputs.roomCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="nickname-content">
            <div>닉네임 <span>필수</span></div>
            <input
              type="text"
              name='nickName'
              minLength={2}
              maxLength={6}
              value={inputs.nickName}
              onChange={handleChangeNickname}
              required />
          </div>
        </div>
        <input type='submit' value='방 만들기' className="create-button" />

      </form>
      {createError && <div style={{ color: 'red' }}>{createError}</div>}
    </div>
  )
}

export default CreateRoomForm

