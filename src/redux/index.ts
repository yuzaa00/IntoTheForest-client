import { ChatAction } from './chat/chatRedux'
import { gameAction } from './game/gameReducer'
import { selectAction } from './game/choiceReducer'
import { SingleReducerAction } from './result/singleReducer'
import { RoomAction } from './room/roomRedux'

export namespace StoreState {

  // export interface Action {
  //   type: string
  //   value: any
  // }

  interface selChar  {
    char: string
  }

  interface usersItem {
    socketId: string
    photoUrl: string
    nickName: string
    ready?: boolean
  }

  interface RoomState  {
    roomCode: string
    roomId: string
    users: usersItem[]
    currentUser: usersItem
    game: boolean
    gameData: any
    mySocketId: string
    isVideo: boolean
    isHost: string
    isGameStart: boolean
    isGameOver: boolean
    openResult: boolean
  }

  export interface gameState  {
    width: number
    height: number
    multi: number
    mode: string
  }

  interface chatItem {
    nickName: string
    photoUrl: string
    socketId: string
    content: string
    date: string
  }
  
  interface ChatState {
    chatList: chatItem[]
    unreadCount: number
  }

  interface SingleReducerState {
    game: boolean,
    gameData: {
      score: any,
      life: any,
      stage: any,
      bird: any,
      squi: any
    }
  }

  export interface All {
    choiceReducer: any,
    roomReducer: RoomState
    gameReducer: gameState
    chatReducer: ChatState 
    singleReducer: SingleReducerState
  }

  export interface Action<T = any> {

  }
  
}
