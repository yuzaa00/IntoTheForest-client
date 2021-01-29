import io from 'socket.io-client';
import * as types from './socket.type' 
const socket = io('http://localhost:4000', {transports: ['websocket']})

export const getMySocketId = () => socket.id;

const roomSocket = {
  createRoom(roomData : types.roomData, cb: Function) {
    socket.emit('create room', roomData, cb)
  },

  joinRoom(joinRoom: types.joinRoom, cb: Function) {
    socket.emit('join room', joinRoom, cb);
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
    socket.on('new user', cb);
  },

  userLeaved(cb) {
    socket.on('leave user', cb);
  },

  // updateRoomList() {
  //   socket.emit(EVENT.ROOM_LIST);
  // },
  // joinRoom({ roomId, user }, cb) {
  //   socket.emit(EVENT.JOIN_ROOM, { roomId, user }, cb);
  // },

  leaveRoom( roomCode: any ) {
    socket.emit('leave room', roomCode);
  },
  // updateRoomLockingStatus({ roomId, isLocked }) {
  //   socket.emit(EVENT.LOCKING_STATUS, { roomId, isLocked });
  // },
  // listenUpdateRoomList(cb) {
  //   socket.on(EVENT.ROOM_LIST, cb);
  // },
  // listenMemberJoined(cb) {
  //   socket.on(EVENT.MEMBER_JOINED, cb);
  // },
  listenUserLeaved(cb) {
    socket.on('user leaved', cb);
  },
  // listenUpdateRoomLockingStatus(cb) {
  //   socket.on(EVENT.LOCKING_STATUS, cb);
  // },
  // renderFilter({ roomId, isFilterOn, filter }) {
  //   socket.emit(EVENT.VIDEO_FILTER, { roomId, isFilterOn, filter });
  // },
  // listenRenderFilter(cb) {
  //   socket.on(EVENT.VIDEO_FILTER, cb);
  // },
  // cleanUpLobbyListener() {
  //   socket.off(EVENT.ROOM_LIST);
  // },
  cleanUpRoomListener() {
    socket.off('user joined');
    socket.off('user leaved');
    // socket.off(EVENT.LOCKING_STATUS);
    // socket.off(EVENT.VIDEO_FILTER);
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
    socket.off('chat');
  },
};

const gameSocket = {
  sendInput(roomCode: string, socketId: String) {
    socket.emit('space down', { roomCode, socketId })
  },
  getInput(callback: Function) {
    socket.on('space down', callback)
  },
}

const peerSocket = {
  sendingSignal({ signal, receiver, roomCode }) {
    socket.emit('sending signal', { signal, receiver, roomCode });
  },
  listenSendingSignal(cb) {
    socket.on('sending signal', cb);
  },
  returnSignal({ signal, receiver, roomCode }) {
    socket.emit('returning signal', { signal, receiver, roomCode });
  },
  listenReturningSignal(cb) {
    socket.on('returning signal', cb);
  },
  cleanUpPeerListener() {
    socket.off('sending signal');
    socket.off('returning signal');
  },
};

export { roomSocket, chatSocket, peerSocket, gameSocket }
