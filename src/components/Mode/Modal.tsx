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
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  text-align: center;
  font-family: 'Y_Spotlight';
  background: rgba(0, 0, 0, 0.7);
  padding: 2%;

  input {
    text-align: center;
  }

  input, button {
    outline: none;
  }

  .create-room-canvas {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    padding: 25px 0;
    box-sizing: border-box;
    position: relative;
  }

  .create-room-canvas {
    height: 90vh;
  }

  .join-room-canvas {
    margin-top: 10%;
  }

  .create-room-canvas input,
  .join-room-canvas input {
    width: 97%;
    height: 30px;
    display: inline-block;
    border-radius: 20px;
  }

  .create-room-canvas .title,
  .join-room-canvas .title {
    width: 100%;
    font-family: 'BMDOHYEON';
    font-weight: bold;
    font-size: 40px;
  }
  
  .create-room-canvas .subtitle {
    width:100%;
    margin: 1% 0 2%;
    text-align: center;
  }
  
  .create-room-canvas form {
    width: 80%;
    margin: 1% auto 0;
  }

  .join-room-canvas .join-form {
    width: 100%;
    height: 80%;
    box-sizing: border-box;
  }
  
  .create-room-canvas .people {
    width: 100%;
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
    box-shadow: 2px 2px 5px 7px rgba(0, 0, 0, .6);
    border-radius: 50px;
    padding: 8% 0;
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
    height: 25%;
    display: flex;
    box-sizing: border-box;
    margin: 2% 0;
  }

  .join-room-canvas .join-room-area {
    width: 80%;
    margin: 0 auto;
  }
  
  .create-room-canvas .create-room-area .create-room-content {
    width: 100%;
  }

  .main-text {
    font-size: 30px;
  }

  .join-room-canvas .join-room-area .join-room-content,
  .join-room-canvas .join-room-area .join-nickname-content {
    width: 50%;
    margin: 5% auto;
  }
  
  .create-room-canvas .create-room-area .create-nickname-content { 
    width: 100%;
    height: 100px;
  }

  .join-room-canvas .button-area {
    margin: 0;
  }
  
  .create-room-canvas .create-button,
  .button-area button,
  .join-room-canvas .join-button {
    width: 120px;
    height: 70px;
    border-radius: 30px;
    color: white;
    font-family: 'Y_Spotlight';
    cursor: pointer;
  }

  .create-room-canvas .create-button {
    margin-top: 5%;
  }

  .create-room-canvas .create-button, 
  .join-room-canvas .join-button {
    width: 50%;
    height: 100px;
    background-color: ${({ theme }) => theme.gray};
    color: #222;
    font-family: 'BMDOHYEON';
    font-size: 30px;
  }

  .join-room-canvas .join-button {
    width: 50%;
    margin: 0 auto;
  }

  .create-button:hover,
  .join-button:hover {
    background-color: ${({ theme }) => theme.grayHover};
  }

.button-area button {
    position: fixed;
    bottom: 1%;
    right: 1%;
    background-color: red;
    font-size: 20px;
  }

  .button-area button:hover {
    background-color: ${({ theme }) => theme.redHover};
  }
  
  .create-room-canvas .create-room-area span,
  .create-room-canvas .nickname-content span {
    color: red;
    font-size: 15px;
  }
  
  .create-room-canvas input,
  .join-room-canvas input {
    margin-top: 20px;
    padding: 12px 0;
    font-family: 'Y_Spotlight';
  }

  .error-msg {
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
