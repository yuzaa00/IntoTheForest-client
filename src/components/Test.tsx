import React, { useState, useEffect }from 'react';
import axios from 'axios'
import { RootState } from '../redux/reducers';
import { useSelector, useDispatch } from 'react-redux';

import io from 'socket.io-client';
 
function Test() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  const socket = io('https://elb.intotheforest.space', {transports: ['websocket']})

  useEffect(() => {
    axios.get('https://elb.intotheforest.space/rank/load', {
      headers: {
        secretCode: 'shelter'
      }
    })
    socket.on('connect', () => {
      console.log(3)
      setIsConnected(true);
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
    socket.emit('hello!', 'hello');
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