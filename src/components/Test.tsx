import React, { useState, useEffect }from 'react';
import { RootState } from '../redux/reducers';
import { useSelector, useDispatch } from 'react-redux';

import { io } from 'socket.io-client'



function Test() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  const socket = io('http://localhost:4000', {transports: ['websocket']})

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    //socket.emit('events', { test: 'test' });

    socket.emit('identity', 5, (response:any) =>
    console.log('Identity:', response),
    );
    
    socket.on('message', (data:any) => {
      setLastMessage(data);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  });

  const sendMessage = () => {
    socket.emit('hello!');
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Connected: { '' + isConnected }</p>
        <p>Last message: { lastMessage || '-' }</p>
        <button onClick={ sendMessage }>Say hello!</button>
      </header>
    </div>
  );
}

export default Test;