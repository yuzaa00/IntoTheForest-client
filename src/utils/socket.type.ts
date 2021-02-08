import { setFlagsFromString } from "v8"

export interface roomData {
  roomCode: string
  nickName: string
  maxNum: number
}

export interface roomCode {
  roomCode: string
}

export interface response {
  roomId: string
  error: string
  clientId: string
}

export interface joinRoom {
  nickName: string
  roomCode: string
}

export interface userData {
  photoUrl: string,
  roomCode: roomCode,
  nickName: string,
}

export interface stream {
  signal: Object,
  receiver: user,
  roomCode: string
}

interface user {
  nickName: string
  socketId: string
  photoUrl: string
}

export interface newChat {
  newChat: {
    chat: {
      nickName: string,
      photoUrl: string,
      content: string,
      date: string,
      socketId: string,
    },
    roomCode: string
  }
}
