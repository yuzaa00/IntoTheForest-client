import React, { useState } from 'react';
import PropTypes from 'prop-types';

interface Props {
  onSubmit: Function
}

function JoinRoomForm( {onSubmit}: Props ) {
  const [input, setInput] = useState('')
  const [nickInput, nickSetInput] = useState('')

  const submitRoomData = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault()
    onSubmit({
      roomCode: input,
      nickName: nickInput
    })
  };

  const handleInputCodeChange = (ev: { target: { value: string } }) => {
    const { value } = ev.target
    setInput(value)
  };

  const handleInputNickChange = (ev: { target: { value: string } }) => {
    const { value } = ev.target
    nickSetInput(value)
  };

  return (
    <div>
      <h2>방에 참여하기</h2>
      <h3>방 이름을 입력하세요</h3>
      <form onSubmit={submitRoomData}>
        <input
          type='text'
          name='roomCode'
          min="2" 
          max="6"
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
          min="2" 
          max="6"
          required
          placeholder='닉네임을 넣어주세요'
          title='2~6자리의 닉네임을 넣어주세요'
          value={nickInput}
          onChange={handleInputNickChange}
        />
        <input type='submit' value='방 참여하기' />
      </form>
    </div>
  );
}

export default JoinRoomForm;

JoinRoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
