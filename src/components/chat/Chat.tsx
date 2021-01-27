import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { chatSocket } from '../../utils/socket'
import { RootState } from '../../redux/rootReducer'
import { BsFillChatDotsFill } from 'react-icons/bs'
import ChatRoom from './ChatRoom'
import Button from '../Mode/Button'


interface Chat {
  chat: string
}

function Chat() {
  const dispatch = useDispatch()
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(false)
  const unreadCount = useSelector((state: RootState) => state.chatReducer.unreadCount)

  useEffect(() => {
    chatSocket.listenMessage(({ chat }: Chat) => dispatch({ type: 'ADD_CHAT', value: chat }))

    return () => {
      chatSocket.cleanUpMessageListener();
      dispatch({ type: 'RESET_CHAT'})
    }
  }, [])

  useEffect(() => {
    if (isChatRoomOpen) return
    const chatList = useSelector((state: RootState) => state.chatReducer.chatlist)
    if (chatList.length) {
      dispatch({ type: 'INCREASE_UNREAD_COUNT'})
    }
  }, [chatList, isChatRoomOpen])

  useEffect(() => {
    dispatch({ type: 'RESET_UNREAD_COUNT'})
  }, [isChatRoomOpen]);

  return (
    <>
      <Button onClick={() => setIsChatRoomOpen(!isChatRoomOpen)}>
        <BsFillChatDotsFill size={28} />
        {!!unreadCount && <Badge>{unreadCount}</Badge>}
      </Button>
      {isChatRoomOpen &&
        <ChatRoom/>
      }
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
  background-color: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.white};
`;

export default Chat;

Chat.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
  }).isRequired,
  chatList: PropTypes.array.isRequired,
  unreadCount: PropTypes.number.isRequired,
  addChat: PropTypes.func.isRequired,
  resetChat: PropTypes.func.isRequired,
  increaseUnreadCount: PropTypes.func.isRequired,
  resetUnreadCount: PropTypes.func.isRequired,
};
