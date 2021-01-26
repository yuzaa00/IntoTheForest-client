import React, { useState } from 'react'
import { roomSocket } from '../../utils/socket'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

interface joinRoom {
  nickName: string
  roomCode: string
}

interface response {
  roomId: string
  error: string
}

function JoinRoomForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [input, setInput] = useState('')
  const [nickInput, nickSetInput] = useState('')
  const [joinError, setjoinError] = useState('')

  const moveToRoom = (response: response) => {
    const { roomId, error } = response
    
    if(!roomId) {
      setjoinError(error)
    }
    else {
      dispatch({
        type: 'SAVE_ROOM_CODE',
        value: input
      })
      history.push(`rooms/${roomId}`)
    } 
  }

  const joinRoom = (joinRoom: joinRoom) => {
    roomSocket.joinRoom({ joinRoom }, (roomId: response) => moveToRoom(roomId))
  }

  const submitRoomData = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault()
    joinRoom({
      roomCode: input,
      nickName: nickInput
    })
  }

  const handleInputCodeChange = (ev: { target: { value: string } }) => {
    const { value } = ev.target
    setInput(value)
  }

  const handleInputNickChange = (ev: { target: { value: string } }) => {
    const { value } = ev.target
    nickSetInput(value)
  }

  return (
    <div>
      <h2>방에 참여하기</h2>
      <h3>방 이름을 입력하세요</h3>
      <form onSubmit={submitRoomData}>
        <input
          type='text'
          name='roomCode'
          minLength={2}
          maxLength={6}
          required
          placeholder='방 이름을 넣어주세요'
          title='2~6자리의 방 이름을 넣어주세요'
          value={input}
          onChange={handleInputCodeChange}
        />
      <h2>닉네임 입력</h2>
      <h3>사용하실 이름을 입력하세요</h3>
      <input
          type='text'
          name='nickName'
          minLength={2}
          maxLength={6}
          required
          placeholder='닉네임을 넣어주세요'
          title='2~6자리의 닉네임을 넣어주세요'
          value={nickInput}
          onChange={handleInputNickChange}
        />
        <input type='submit' value='방 참여하기' />
        {joinError && <div style={{color: 'red'}}>{joinError}</div>}
      </form>
    </div>
  )
}

export default JoinRoomForm