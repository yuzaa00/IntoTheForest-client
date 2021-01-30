import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { chatSocket } from '../../utils/socket'
import { RootState } from '../../redux/rootReducer'
import { BsFillChatDotsFill } from 'react-icons/bs'
import ChatRoom from './ChatRoom'
import Button from '../Mode/Button'

function Chat() {
  const dispatch = useDispatch()
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(false)
  const chatList = useSelector((state: RootState) => state.chatReducer.chatList, shallowEqual)
  const unreadCount = useSelector((state: RootState) => state.chatReducer.unreadCount)
  
  useEffect(() => {
    console.log('Hi')
    chatSocket.listenMessage(({ chat }: any) => {
      console.log(3, chat.chat, typeof chat.chat)
      dispatch({ type: 'ADD_CHAT', value: chat.chat })
    })

    return () => {
      chatSocket.cleanUpMessageListener();
      // dispatch({ type: 'RESET_CHAT'})
    }
  }, [chatList])

  useEffect(() => {
    if (isChatRoomOpen) return
    
    if (chatList.length) {
      dispatch({ type: 'INCREASE_UNREAD_COUNT'})
    }
  }, [chatList, isChatRoomOpen])

  useEffect(() => {
    dispatch({ type: 'RESET_UNREAD_COUNT'})
  }, [isChatRoomOpen])

  return (
    <>
      <Button onClick={() => setIsChatRoomOpen(!isChatRoomOpen)}>
        <BsFillChatDotsFill size={50} color='yellow' />
        {!!unreadCount && <Badge>{unreadCount}</Badge>}
      </Button>
      {isChatRoomOpen && <ChatRoom onSubmit={(newChat: any) => chatSocket.sendMessage({ newChat })} />}
    </>
  );
}

const Badge = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: red};
  color: white};
`;

export default Chat