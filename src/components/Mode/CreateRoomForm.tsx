import React, { useState } from 'react'
import { roomSocket } from '../../utils/socket'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
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


function CreateRoomForm({ setModalOpen }: boolean ) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [createError, setCreateError] = useState('')
  const [inputs, setInputs] = useState({
    roomCode: '',
    nickName: '',
    maxNum: '2',
  })
  const [member, setMember] = useState(0);
  
  const moveToRoom = (response: response) => {
    const { roomId, error } = response
    
    if(!roomId) {
      setCreateError(error)
    }
    else {
      dispatch({
        type: 'SAVE_ROOM_CODE',
        value: inputs.roomCode
      })
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

  const handleRoomcodeChange = (ev: { target: { value: string, name: string } }) => {
    const { name, value } = ev.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleNicknameChange = (ev: { target: { value: string, name: string } }) => {
    console.log(ev.target.value);
  }

  const closeModal = () => {
    setModalOpen(false);
    history.push('/mode');
  }

  return (
    <div>
      <div className="create-room-canvas">
        <div className="title">방 생성</div>
        <div className="subtitle">2인, 4인이 함께 게임을 즐겨보세요!</div>

        <form onSubmit={submitRoomData}>

          <div className="people">
            {member === 2?
            <div onClick={()=>setMember(2)} className="highlight">
              2인
            </div>
            : <div onClick={()=>setMember(2)}>
              2인
            </div>}

            {member === 4? 
            <div className="highlight">
              <div onClick={()=>setMember(4)}>
                4인
              </div>
            </div>
            : <div onClick={()=>setMember(4)}>
              4인
            </div>}
          </div>

          <div className="create-room-area">
            <div className="create-room-content">
              <div className="main-text">방 코드 설정 {createError && <span>필수</span>}</div>
              <input
              type='text'
              name='roomCode'
              minLength={2}
              maxLength={6}
              value={inputs.roomCode}
              onChange={handleRoomcodeChange}/>
            </div>
            <div className="nickname-content">
                <div className="main-text">닉네임 {createError && <span>필수</span>}</div>
                <input
                type="text"
                minLength={2}
                maxLength={6}
                onChange={handleNicknameChange}/>
              </div>
          </div>
          {createError && <div className="error-msg">{createError}</div>}
          {/* <div className="error-msg">정확히 입력해주세요</div> */}
          <div className="button-area">
            <input type='submit' value='방 만들기' className="create-button" />
            <button onClick={closeModal}>닫기</button>
          </div>
        </form>
        </div>
    </div>
  )
}

export default CreateRoomForm

