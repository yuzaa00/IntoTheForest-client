import io from 'socket.io-client';
import * as types from './socket.type'
const socket = io('http://localhost:4000', { transports: ['websocket'] })

export const getMySocketId = () => socket.id

const roomSocket = {
  createRoom(roomData: types.roomData, cb: Function) {
    socket.emit('create room', roomData, cb)
  },

  joinRoom(joinRoom: types.joinRoom, cb: Function) {
    socket.emit('join room', joinRoom, cb)
  },

  userJoined(roomCode: string) {
    socket.emit('user joined', roomCode)
  },

  userJoinedOn(cb: Function) {
    socket.on('user joined', cb)
  },

  emitSetProfile(userData: types.userData) {
    socket.emit('set profile', userData)
  },

  onSetProfile(cb: Function) {
    socket.on('set profile', cb)
  },

  newUserJoined(cb: Function) {
    socket.on('new user', cb)
  },

  userLeaved(cb: Function) {
    socket.on('leave user', cb)
  },

  leaveRoom(roomCode: any) {
    socket.emit('leave room', roomCode)
  },

  listenUserLeaved(cb: Function) {
    socket.on('user leaved', cb)
  },

  cleanUpRoomListener() {
    socket.off('user joined')
    socket.off('user leaved')
    // socket.off(EVENT.LOCKING_STATUS);
    // socket.off(EVENT.VIDEO_FILTER);
  },
  sendReady(roomCode: string) {
    socket.emit('send ready', roomCode)
  },
  listenStart(callback: Function) {
    socket.on('send ready', callback)
  },
  sendResult(result: object) {
    socket.emit('send result', result)
  },
  listenResult(callback: Function) {
    socket.on('send result', callback)
  },

  sendStart(roomCode: string) {
    socket.emit('game start', roomCode)
  },

  listenGameStart(callback: Function) {
    socket.on('game start', callback)
  },

  listenReadyCheck(callback: Function) {
    socket.on('ready check', callback)
  },

};

const chatSocket = {
  sendMessage({ newChat }: types.newChat) {
    socket.emit('chat', newChat)
  },
  listenMessage(callback: Function) {
    socket.on('chat', callback)
  },
  cleanUpMessageListener() {
    socket.off('chat')
  },
}

const gameSocket = {
  // sendInput(roomCode: string, socketId: String) {
  //   socket.emit('space down', { roomCode, socketId })
  // },
  // getInput(callback: Function) {
  //   socket.on('space down', callback)
  // },

}

const peerSocket = {
  sendingSignal({ signal, receiver, roomCode }: types.stream) {
    socket.emit('sending signal', { signal, receiver, roomCode })
  },
  listenSendingSignal(cb: Function) {
    socket.on('sending signal', cb)
  },
  returnSignal({ signal, receiver, roomCode }: types.stream) {
    socket.emit('returning signal', { signal, receiver, roomCode })
  },
  listenReturningSignal(cb: Function) {
    socket.on('returning signal', cb)
  },
  cleanUpPeerListener() {
    socket.off('sending signal')
    socket.off('returning signal')
  },
}

const verifySocket = {
  getAccessToken(data: string) {
    socket.emit('access token', data)
  },

  getAccessTokenListen(cb: Function) {
    socket.on('access token', cb)
  },
}

export { roomSocket, chatSocket, peerSocket, gameSocket, verifySocket }
