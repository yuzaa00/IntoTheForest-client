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