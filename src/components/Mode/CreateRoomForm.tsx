import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CreateRoomForm({ onSubmit }) {
  const [inputs, setInputs] = useState({
    roomCode: '',
    maxNum: '2',
  });

  const submitRoomData = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault();
    const { roomCode, maxNum } = inputs;
    onSubmit({ roomCode, maxNum: Number(maxNum) });
  };

  const handleInputChange = (ev: { target: { value: string, name: string } }) => {
    const { name, value } = ev.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>멀티 모드 방</h2>
      <h3>좌석의 최대 인원은 4명입니다.</h3>
      <form onSubmit={submitRoomData}>
        <input
          type='text'
          name='roomCode'
          minLength='2'
          maxLength='6'
          value={inputs.roomCode}
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
        <input type='submit' value='좌석 잡기' />
      </form>
    </div>
  );
}

export default CreateRoomForm;

CreateRoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
