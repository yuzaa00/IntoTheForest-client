import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { chatSocket } from '../../utils/socket'
import { RootState } from '../../redux/rootReducer'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import format from 'date-fns/format'

function ChatRoom({onSubmit}: any) {
  const [input, setInput] = useState('')
  const messageRef = useRef<any>()
  console.time('d')
  const chatList = useSelector((state: RootState) => state.chatReducer.chatList,shallowEqual)
  const roomCode = useSelector((state: RootState) => state.roomReducer.roomCode,shallowEqual)
  const user = useSelector((state: RootState) => state.roomReducer.users[0],shallowEqual)
  console.timeEnd('d')
  useEffect(() => {
    messageRef.current!.scrollTop = messageRef.current!.scrollHeight
  }, [chatList])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInput(value)
  }

  const handleMessageSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const trimmedInput = input.trim()

    if (!trimmedInput) return;

    const time = format(new Date(), 'HH:mm')
    const newChat = {
      chat: {
        nickName: user.nickName,
        photoUrl: user.photoUrl,
        content: trimmedInput,
        date: time,
        socketId: user.socketId,
      },
      roomCode: roomCode
    }
    console.log(newChat, input, trimmedInput)
    onSubmit(newChat)
    setInput('')
  }

  const checkMyMessage = (id: string) => {
    return id === user.socketId ? 'my-message' : 'friend-message';
  }
  
  return (
    <Wrapper>
      <MessageList ref={messageRef}>
        {chatList &&
          chatList.map((chat, idx) => (
            <ChatCell key={idx} className={checkMyMessage(chat.socketId)}>
              <Profile>
                <img src={chat.photoUrl || "../../images/card/card5.png" } />
                <div>{chat.nickName}</div>
              </Profile>
              <span>{chat.content}</span>
              <span>{chat.date}</span>
            </ChatCell>
          ))}
      </MessageList>
      <MessageForm onSubmit={handleMessageSubmit}>
        <input
          autoComplete='off'
          onChange={handleInputChange}
          type='text'
          name='message'
          value={input}
        />
        <input type='submit' value='SEND' />
      </MessageForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 25;
  background-color: darkPurple};
  width: 400px;
  height: 1000px;
  position: fixed;
  right: 100px;
  bottom: 100px;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(
    283deg
     ,#f8f6ff,#ffbae0);
`;

const MessageList = styled.div`
  width: 100%;
  height: 900px;
  padding-top: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageForm = styled.form`
  background-color: yellow;
  width: 100%;
  height: 80px;
  display: flex;

  input {
    all: unset;
  }

  input[type='text'] {
    width: 70%;
    padding: 0px 20px;
    background-color: ${({ theme }) => theme.white};
  }

  input[type='submit'] {
    cursor: pointer;
    width: 30%;
    text-align: center;
    background-color: ${({ theme }) => theme.orange};
  }
`;

const ChatCell = styled.div`
  min-width: 280px;
  max-width: 340px;
  display: flex;
  align-items: flex-start;
  padding: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 24px;
    margin-bottom: 6px;
  }

  span:nth-child(2) {
    background-color: #fffddf91;
    padding: 10px;
    margin-right: 6px;
    border-radius: 20px;
  }

  span:nth-child(3) {
    font-size: 12px;
    color: gray;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px 10px;
  font-size: 14px;
  color: white};
`;

export default ChatRoom
