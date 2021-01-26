import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CreateRoom.css';

function CreateRoomForm({ onSubmit }) {
  const [inputs, setInputs] = useState({
    roomCode: '',
    maxNum: '2',
  });

  const submitRoomData = ev => {
    ev.preventDefault();
    const { roomCode, maxNum } = inputs;
    onSubmit({ roomCode, maxNum: Number(maxNum) });
  };

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
          <input type='submit' value='방 만들기' />
        {/* <input
          type='number'
          name='maxNum'
          min='2'
          max='4'
          step='2'
          value={inputs.maxNum}
          onChange={handleInputChange}
          required
        /> */}
      </form>
    </div>
  );
}

export default CreateRoomForm;

CreateRoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
