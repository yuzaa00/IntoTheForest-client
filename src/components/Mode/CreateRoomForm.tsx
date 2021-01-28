import React, { useState } from 'react'
import { roomSocket } from '../../utils/socket'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { roomData, response } from '../../utils/socket.type'
import crypto from 'crypto'

function CreateRoomForm({setModalOpen}: boolean ){
  const dispatch = useDispatch();
  const history = useHistory();
  const [createError, setCreateError] = useState('');
  const [user, setUser] = useState(0);
  const [inputs, setInputs] = useState({
    roomCode: '',
    nickName: '',
    maxNum: 2,
  });
  // const [returnError, setReturnError] = useState('');

  const moveToRoom = (response: response) => {
    const { roomId, clientId, error } = response
    console.log('moveToRoom', roomId, clientId, error);
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
  const createRoom = (roomData: roomData ) => {
    roomSocket.createRoom(roomData, (roomId: response) => moveToRoom(roomId))
    console.log('createRoom', roomData);
  }
  const submitRoomData = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault()
    const { roomCode, maxNum, nickName } = inputs

    // if(roomCode.length < 2 && nickName.length < 2) {
    //   setReturnError('모든 입력 값을 두 글자 이상 여섯 글자 이하로 입력하세요!');
    // }
    // else if(roomCode.length < 2) {
    //   setReturnError('방 코드를 두 글자 이상 여섯 글자 이하로 입력하세요!');
    // } else if(nickName.length < 2) {
    //   setReturnError('닉네임을 두 글자 이상 여섯 글자 이하로 입력하세요!');
    // } else {
    //   setReturnError('');
    // }
    createRoom({ roomCode, nickName, maxNum: maxNum })
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
            <div onClick={()=>setUser(2)} className={user === 2 && "highlight"}>
              2인
            </div>
            <div onClick={()=>setUser(4)} className={user === 4 && "highlight"}>
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
              onChange={handleChangeNickname}
              />
          </div>
          <div className="error-area">
            {createError && <div className="error-msg">{createError}</div>}
            {/* {returnError  && <div className="error-msg">{returnError}</div>} */}
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