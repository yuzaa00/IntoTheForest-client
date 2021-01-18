import G from 'glob';
import React, { useState }from 'react';

import './App.css';
import Game from './game'

function App() {
  const [count, setCount] = useState(0);
  
  return (
    count ? <div><Game></Game></div> :
    <div className="App">
      <header className="App-header">
        <img src={'images/character/logo.png'} className="App-logo" alt="logo" />
        <button onClick={()=> setCount(1)}>
          Game Start!!!
        </button>
        <button className='load_record'>load Record</button>
      </header>
    </div>
  );
}

export default App;
