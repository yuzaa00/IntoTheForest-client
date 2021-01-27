import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeConsumer } from 'styled-components';

// import { GrFormClose } from 'react-icons/gr';
// import Button from './Button';

const theme = {
  purple: '#56109B',
  darkPurple: '#330656',
  orange: '#FF7B12',
  orangeHover: '#FF6E12',
  mint: '#1AC8BE',
  mintHover: '#1ABCBE',
  white: '#FFF',
  lightGray: '#D1D8E0',
  gray: '#ddd',
  grayHover: '#ccc',
  pink: '#FF5C78',
  red: '#E93E5D',
  redHover: '#E60304',
  emerald: '#9CE6C5',
  green: '#44BE6E',
};

function Modal({ children }: any) {
  return (
      <StyledModal theme={theme}>
        {children}
      </StyledModal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  height: 600px;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  text-align: center;
  font-family: 'Y_Spotlight';

  input {
    text-align: center;
  }

  input, button {
    outline: none;
  }

  .create-room-canvas {
    width: 1200px;
    height: 600px;
    background: rgba(0, 0, 0, 0.7);
    margin: 0 auto;
    padding: 25px 0;
    box-sizing: border-box;
  }

  .create-room-canvas input {
    width: 97%;
    height: 30px;
    display: inline-block;
    border-radius: 25px;
  }

  .create-room-canvas .title {
    width: 100%;
    font-family: 'BMDOHYEON';
    font-weight: bold;
    font-size: 40px;
  }
  
  .create-room-canvas .subtitle {
    width: inherit;
    height: 20px;
    margin: 5px 0 30px;
  }
  
  .create-room-canvas form {
    width: 80%;
    margin: 10px auto 0;
  }
  
  .create-room-canvas .people {
    width: 100%;
    height: 170px;
    line-height: 170px;
    display: flex;
    margin-bottom: 30px;
  }

  .create-room-canvas .people .highlight {
  box-shadow: #FC0 5px 0 20px;
}
  
  .create-room-canvas .people div {
    width: 48%;
    background-color: ${({ theme }) => theme.mint};
    font-family: 'BMDOHYEON';
    font-size: 50px;
    font-weight: bold;
    box-shadow: 2px 2px 10px 5px rgba(0, 0, 0, .8);
    border-radius: 50px;
    cursor: pointer;
  }
  
  .create-room-canvas .people div:hover {
    background-color: ${({ theme }) => theme.mintHover};
  }
  
  .create-room-canvas .people div:first-child {
    background-color: ${({ theme }) => theme.orange};
    margin-right: 4%;
  }
  
  .create-room-canvas .people div:first-child:hover {
    background-color: ${({ theme }) => theme.orangeHover};
  }
  
  .create-room-canvas .create-room-area {
    width: 100%;
    height: 150px;
    display: flex;
    box-sizing: border-box;
  }
  
  .create-room-canvas .create-room-area .create-room-content {
    width: 100%;
  }

  .create-room-canvas .main-text {
    font-size: 30px;
  }
  
  .create-room-canvas .create-room-area .nickname-content {
    width: 100%;
    height: 100px;
    /* margin-bottom: 20px; */
  }
  
  .create-room-canvas .create-button,
  .button-area button {
    width: 120px;
    height: 70px;
    border-radius: 40px;
    color: white;
    font-family: 'Y_Spotlight';
    font-size: 20px;
    cursor: pointer;
  }

  .create-room-canvas .create-button {
    width: 800px;
    background-color: ${({ theme }) => theme.gray};
    color: #222;
    margin-right: 30px;
  }

  .create-room-canvas .create-button:hover {
    background-color: ${({ theme }) => theme.grayHover};
  }

  .create-room-canvas .button-area button {
    background-color: red;
  }

  .create-room-canvas .button-area button:hover {
    background-color: ${({ theme }) => theme.redHover};
  }
  
  .create-room-canvas .create-room-area span,
  .create-room-canvas .nickname-content span {
    color: red;
    font-size: 15px;
  }
  
  .create-room-canvas .create-room-area input {
    margin-top: 20px;
    padding: 12px 0;
    font-family: 'Y_Spotlight';
  }

  .create-room-canvas .error-msg {
    color: red;
    margin-bottom: 20px;
  }


  // input[type='email'] {
  //   all: unset;
  //   color: ${({ theme }) => theme.purple};
  // }
`;

export default Modal;

Modal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  children: PropTypes.node,
};
