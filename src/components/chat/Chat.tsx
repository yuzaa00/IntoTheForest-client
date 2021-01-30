import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { chatSocket } from '../../utils/socket'
import { RootState } from '../../redux/rootReducer'
import { BsFillChatFill } from 'react-icons/bs'
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
        <BsFillChatFill size={65} color='yellow' />
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
top: 15px;
right: 27px;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: center;
-webkit-justify-content: center;
-ms-flex-pack: center;
justify-content: center;
-webkit-align-items: center;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
border-radius: 50%;
font-size: 17px;
background-color: red;
color: white;
padding-left: 4px;
padding-top: 4px;
padding-right: 4px;
padding-bottom: 4px;
`;

export default Chat