import React, { useState } from 'react'
import { roomSocket } from '../../utils/socket'
import { useHistory } from 'react-router-dom'

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
    const { name, value } = ev.target
    setInputs(prev => ({ ...prev, [name]: value }))
  }
  return (
    <div>
      <h2>멀티 모드 방</h2>
      <h3>방의 최대 인원은 4명입니다.</h3>
      <form onSubmit={submitRoomData}>
        <input
          type='text'
          name='roomCode'
          placeholder='방 이름 입력'
          minLength={2}
          maxLength={6}
          value={inputs.roomCode}
          onChange={handleInputChange}
          required
        />
          <input
          type='text'
          name='nickName'
          placeholder='닉네임 입력'
          minLength={2}
          maxLength={6}
          value={inputs.nickName}
          onChange={handleInputChange}
          required
        />
        <input
          type='number'
          name='maxNum'
          min='2'
          max='4'
          step='2'
          value={inputs.maxNum}
          onChange={handleInputChange}
          required
        />
        <input type='submit' value='방 만들기' />
        {createError && <div style={{color: 'red'}}>{createError}</div>}
      </form>
    </div>
  )
}

export default CreateRoomForm