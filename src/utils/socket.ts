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
  // leaveRoom({ roomId }) {
  //   socket.emit(EVENT.LEAVE_ROOM, { roomId });
  // },
  // updateRoomLockingStatus({ roomId, isLocked }) {
  //   socket.emit(EVENT.LOCKING_STATUS, { roomId, isLocked });
  // },
  // listenUpdateRoomList(cb) {
  //   socket.on(EVENT.ROOM_LIST, cb);
  // },
  // listenMemberJoined(cb) {
  //   socket.on(EVENT.MEMBER_JOINED, cb);
  // },
  // listenMemberLeaved(cb) {
  //   socket.on(EVENT.MEMBER_LEAVED, cb);
  // },
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
  // cleanUpRoomListener() {
  //   socket.off(EVENT.MEMBER_JOINED);
  //   socket.off(EVENT.MEMBER_LEAVED);
  //   socket.off(EVENT.LOCKING_STATUS);
  //   socket.off(EVENT.VIDEO_FILTER);
  // },
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

const peerSocket = {
  sendingSignal({ signal, receiver }) {
    socket.emit('sending signal', { signal, receiver });
  },
  listenSendingSignal(cb) {
    socket.on('sending signal', cb);
  },
  returnSignal({ signal, receiver }) {
    socket.emit('returning signal', { signal, receiver });
  },
  listenReturningSignal(cb) {
    socket.on('returning signal', cb);
  },
  cleanUpPeerListener() {
    socket.off('sending signal');
    socket.off('returning signal');
  },
};

export { roomSocket, chatSocket, peerSocket }
