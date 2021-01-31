import { createAction, ActionType, createReducer } from 'typesafe-actions'

const ADD_CHAT = 'ADD_CHAT';
const RESET_CHAT = 'RESET_CHAT';
const INCREASE_UNREAD_COUNT = 'INCREASE_UNREAD_COUNT';
const RESET_UNREAD_COUNT = 'RESET_UNREAD_COUNT';

export const addChat = createAction(ADD_CHAT)
export const resetChat = createAction(RESET_CHAT)
export const increaseUnreadCount = createAction(INCREASE_UNREAD_COUNT)
export const resetUnreadCount = createAction(RESET_UNREAD_COUNT)

const actions = {
  addChat,
  resetChat,
  increaseUnreadCount,
  resetUnreadCount
}

type ChatAction = ActionType<typeof actions>

interface Action {
  type: string
  value: any
}

interface chatItem {
  nickName: string
  photoUrl: string
  socketId: string
  content: string
  date: string
}

interface ChatState {
  chatList: any
  unreadCount: number
}

const initialState: ChatState = {
  chatList: [],
  unreadCount: 0,
}

const chatReducer = createReducer<ChatState, ChatAction>(initialState, {
  [ADD_CHAT]: (state: ChatState, action: Action) => ({...state,
      chatList: [ ...state.chatList, action.value ]})
    // state.chatList.push(action.value)

  ,
  [RESET_CHAT]: () => ({
    chatList: [],
    unreadCount: 0
  }),
  [INCREASE_UNREAD_COUNT]: (state: ChatState) => ({ ...state, unreadCount: state.unreadCount + 1 }),
  [RESET_UNREAD_COUNT]: (state: ChatState) => ({ ...state, unreadCount: 0 }),
})

export default chatReducer