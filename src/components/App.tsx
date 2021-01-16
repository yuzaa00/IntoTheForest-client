import G from 'glob';
import React, { useState }from 'react';
import logo from '../resource/images/logo.png'
import './App.css';
import Game from './game'

function App() {
  const [count, setCount] = useState(0);
  
  return (
    count ? <div><Game></Game></div> :
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={()=> setCount(1)}>
          Game Start!!!
        </button>
       
      </header>
    </div>
  );
}

export default App;
