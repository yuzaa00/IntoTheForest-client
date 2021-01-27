import React, { useState } from 'react'
import { roomSocket } from '../../utils/socket'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import './JoinRoom.css';

interface joinRoom {
  nickName: string
  roomCode: string
}

interface response {
  roomId: string
  error: string
}

function JoinRoomForm({ setModalOpen }: boolean ) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [input, setInput] = useState('')
  const [nickInput, nickSetInput] = useState('')
  const [joinError, setjoinError] = useState('')

  const moveToRoom = (response: response) => {
    const { roomId, error } = response
    console.log(roomId)
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
    roomSocket.joinRoom(joinRoom, (roomId: response) => moveToRoom(roomId))
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

  const closeModal = () => {
    setModalOpen(false);
    history.push('/mode');
  }

  return (
    <div>
    <div className="join-room-canvas">
      <div className="title">방 참가하기</div>

      <form onSubmit={submitRoomData} className="join-form">

        <div className="join-room-area">

          <div className="join-room-content">
            <div className="main-text">방 이름</div>
            <input
            type='text'
            name='roomCode'
            minLength={2}
            maxLength={6}
            required
            placeholder='방 이름을 입력하세요'
            title='2~6자리의 방 이름을 입력하세요'
            value={input}
            onChange={handleInputCodeChange}
          />
          </div>

          <div className="join-nickname-content">
            <div className="main-text">닉네임 입력</div>
            <input
                type='text'
                name='nickName'
                minLength={2}
                maxLength={6}
                required
                placeholder='닉네임을 입력하세요'
                title='2~6자리의 닉네임을 입력하세요'
                value={nickInput}
                onChange={handleInputNickChange}
              />
          </div>

          <div className="button-area">
            <input type='submit' value='방 참여하기' className="create-button" />
            <button onClick={closeModal}>닫기</button>
          </div> 

          {joinError && <div style={{color: 'red'}}>{joinError}</div>}
        </div>
      </form>
    </div>
    </div>
  )
}

export default JoinRoomForm