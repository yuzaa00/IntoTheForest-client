import React from 'react';
import logo from './images/logo.png'
import './App.css';
import Game from './components/game'

function App() {
  return (
    <div className="App">
       <Game></Game>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome Into the Forest!!!
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
