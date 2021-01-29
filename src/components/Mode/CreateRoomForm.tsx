import React, { useState } from 'react'
import { roomSocket } from '../../utils/socket'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { roomData, response } from '../../utils/socket.type'
import crypto from 'crypto'
function CreateRoomForm({setModalOpen}: any){
  
  const dispatch = useDispatch()
  const history = useHistory()
  const [createError, setCreateError] = useState('')
  const [user, setUser] = useState(2);
  const [inputs, setInputs] = useState({
    roomCode: '',
    nickName: ''
  })
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
        },
        currentUser: {
          nickName: inputs.nickName || crypto.randomBytes(3).toString("hex"),
          socketId: clientId,
          photoUrl: '../../images/card/card5.png'
        }
      })
      history.push(`rooms/${roomId}`)
    }
  }
  const createRoom = (roomData: roomData ) => {
    roomSocket.createRoom(roomData, (roomId: response) => moveToRoom(roomId))
  }
  const submitRoomData = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault()
    const { roomCode, nickName } = inputs
    createRoom({ roomCode, nickName, maxNum: user })
  }
  const handleRoomcodeChange = (ev: { target: { value: string, name: string } }) => {
    const { name, value } = ev.target
    setInputs(prev => ({ ...prev, [name]: value }))
  };
  const handleChangeNickname = (ev: { target: { value: string, name: string } }) => {
    const { name, value } = ev.target
    setInputs(prev => ({ ...prev, [name]: value }))
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  return (
    <div>
      <div className="create-room-canvas">
        <div className="title">방 생성</div>
        <div className="subtitle">최소 2명부터 최대 4명까지 함께 게임을 즐길 수 있어요!</div>

        <form onSubmit={submitRoomData}>
          {user === 0 && <div className="error-msg">입장 가능한 인원 수를 선택하세요!</div>}
          <div className="people">
            <div onClick={()=>setUser(2)} className={user === 2? "highlight" : "nonHighlight"}>
              2인
            </div>
            <div onClick={()=>setUser(4)} className={user === 4? "highlight" : "nonHighlight"}>
              4인
            </div>
          </div>
          
        <div className="create-room-area">
          <div className="create-room-content">
            <div>방 코드 설정 <span>필수</span></div>
            <input
              type='text'
              name='roomCode'
              minLength={2}
              maxLength={6}
              required
              value={inputs.roomCode}
              placeholder='방 이름을 입력하세요'
              onChange={handleRoomcodeChange}/>
            </div>
          </div>
          <div className="nickname-content">
            <div>닉네임 <span>필수</span></div>
            <input
              type="text"
              name='nickName'
              minLength={2}
              maxLength={6}
              required
              value={inputs.nickName}
              placeholder='닉네임을 입력하세요'
              onChange={handleChangeNickname}
              />
          </div>
          <div className="error-area">
            {createError && <div className="error-msg">{createError}</div>}
          </div>

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