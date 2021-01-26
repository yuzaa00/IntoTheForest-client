import React, { useState } from 'react'
import { roomSocket } from '../../utils/socket'
import { useHistory } from 'react-router-dom'
import './CreateRoom.css';

interface roomData {
  roomCode: string
  nickName: string
  maxNum: number
}

interface response {
  roomId: string
  error: string
}

function CreateRoomForm() {
  const history = useHistory()
  const [createError, setCreateError] = useState('')



function CreateRoomForm() {
  const [inputs, setInputs] = useState({
    roomCode: '',
    nickName: '',
    maxNum: '2',
  })
  
  const moveToRoom = (response: response) => {
    const { roomId, error } = response
    
    if(!roomId) {
      setCreateError(error)
    }
    else {
      history.push(`rooms/${roomId}`)
    } 
  }

  const createRoom = (roomData: roomData) => {
    roomSocket.createRoom({ roomData }, (roomId: response) => moveToRoom(roomId))
  }


  const submitRoomData = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault()
    const { roomCode, maxNum, nickName } = inputs
    createRoom({ roomCode, nickName, maxNum: Number(maxNum) })
  }

  const handleInputChange = (ev: { target: { value: string, name: string } }) => {
    const { name, value } = ev.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeNickname = (e: any) => {
    console.log(e.target.value);
  }

  return (
    <div className="create-room-canvas">
      <div className="title">방 만들기</div>
      <div className="subtitle">2인, 4인이 함께 게임을 즐겨보세요!</div>
      <form onSubmit={submitRoomData}>
        <div className="people">
          <div>2인</div>
          <div>4인</div>
        </div>

        <div className="create-room-area">
          <div className="create-room-content">
            <div>방 코드 설정 <span>필수</span></div>
            <input
            type='text'
            name='roomCode'
            min='2'
            max='6'
            value={inputs.roomCode}
            onChange={handleInputChange}
            required
          />
          </div>
           <div className="nickname-content">
              <div>닉네임 <span>필수</span></div>
              <input
              type="text"
              onChange={handleChangeNickname}
              required/>
            </div>
        </div>
        <input type='submit' value='방 만들기' className="create-button"/>
        {createError && <div style={{color: 'red'}}>{createError}</div>}
      </form>
    </div>
  )
}

export default CreateRoomForm

