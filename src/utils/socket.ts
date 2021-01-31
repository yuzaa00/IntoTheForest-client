import io from 'socket.io-client';
import * as types from './socket.type'
const socket = io('http://localhost:4000', { transports: ['websocket'] })

export const getMySocketId = () => socket.id

const roomSocket = {
  // errorHandleTest() {
  //   socket.on('error', function () {
  //     document.write("Sorry, there seems to be an issue with the connection!");
  //     console.log("Sorry, there seems to be an issue with the connection!")
  //   })
  // },

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

  emitSetProfile(userData) {
    socket.emit('set profile', userData)
  },

  onSetProfile(cb) {
    socket.on('set profile', cb)
  },

  newUserJoined(cb) {
    socket.on('new user', cb)
  },

  userLeaved(cb) {
    socket.on('leave user', cb)
  },


  leaveRoom(roomCode: any) {
    socket.emit('leave room', roomCode)
  },

  listenUserLeaved(cb) {
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
};

const chatSocket = {
  sendMessage({ newChat }) {
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
  sendingSignal({ signal, receiver, roomCode }) {
    socket.emit('sending signal', { signal, receiver, roomCode })
  },
  listenSendingSignal(cb) {
    socket.on('sending signal', cb)
  },
  returnSignal({ signal, receiver, roomCode }) {
    socket.emit('returning signal', { signal, receiver, roomCode })
  },
  listenReturningSignal(cb) {
    socket.on('returning signal', cb)
  },
  cleanUpPeerListener() {
    socket.off('sending signal')
    socket.off('returning signal')
  },
}

export { roomSocket, chatSocket, peerSocket, gameSocket }
