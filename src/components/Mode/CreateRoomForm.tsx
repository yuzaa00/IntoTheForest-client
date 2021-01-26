import React, { useState } from 'react';
import PropTypes from 'prop-types';

interface Props {
  onSubmit: Function
}

function CreateRoomForm({ onSubmit }: Props) {
  const [inputs, setInputs] = useState({
    roomCode: '',
    nickName: '',
    maxNum: '2',
  });

  const submitRoomData = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault()
    const { roomCode, maxNum, nickName } = inputs
    onSubmit({ roomCode, nickName, maxNum: Number(maxNum) })
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
          minLength='2'
          maxLength='6'
          value={inputs.roomCode}
          onChange={handleInputChange}
          required
        />
          <input
          type='text'
          name='nickName'
          placeholder='닉네임 입력'
          minLength='2'
          maxLength='6'
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
      </form>
    </div>
  );
}

export default CreateRoomForm;

CreateRoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
