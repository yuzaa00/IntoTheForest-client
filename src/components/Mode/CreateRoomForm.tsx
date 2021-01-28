import React, { useState } from 'react'
import { roomSocket } from '../../utils/socket'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { roomData, response } from '../../utils/socket.type'
import crypto from 'crypto'
import './CreateRoom.css';
function CreateRoomForm({setModalOpen}: any){
  const dispatch = useDispatch()
  const history = useHistory()
  const [createError, setCreateError] = useState('')
  const [users, setUser] = useState(0);
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
  const createRoom = (roomData: roomData) => {
    roomSocket.createRoom(roomData, (roomId: response) => moveToRoom(roomId))
  }
  const submitRoomData = (ev: { preventDefault: () => void; }) => {
    console.log(users)
    if(users === 0) {
      setCreateError('방을 선택해주세요')
      return
    }
    else {
      ev.preventDefault()
      const { roomCode, nickName } = inputs
      createRoom({ roomCode, nickName, maxNum: users })
    }
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
    history.push('/mode')
  }
  return (
    <div>
      <div className="create-room-canvas">
        <div className="title">방 생성</div>
        <div className="subtitle">최소 2명부터 최대 4명까지 함께 게임을 즐길 수 있어요!</div>
        <form target='iframe'>
          <div className="people">
            {users === 2?
            <div onClick={()=>setUser(2)} className="highlight">
              2인
            </div>
            : <div onClick={()=>setUser(2)}>
              2인
            </div>}
            {users === 4? 
              <div onClick={()=>setUser(4)} className="highlight">
                4인
              </div>
            : <div onClick={()=>setUser(4)}>
              4인
            </div>}
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
              value={inputs.nickName}
              onChange={handleChangeNickname}
              required />
          </div>
          <br></br>
      {createError && <div className="error-msg">{createError}</div>}
      <div className="button-area"></div>
      <input type='submit' value='방 만들기' className="create-button" onClick={submitRoomData} />
      <button onClick={closeModal}>닫기</button>
      </form>
      </div>
      <iframe src="#" name="iframe" style={{"width":"1px", "height":"1px", "border":0, "visibility":"hidden"}}></iframe>
    </div>
  )
}
export default CreateRoomForm