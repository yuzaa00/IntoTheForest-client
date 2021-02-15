import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import './welcome.css'
import './Background.css';
import video from '../../images/stage-3.mp4'

function Welcome() {

  return (
    <div>
    <div className="gif-background">
      <div className="dark-background">
      <video className='videovideovideo'
        src={video}
        width='300px'
        autoPlay
        loop
        muted>
        </video>
        <div className="game-title">INTO THE FOREST</div>
        <div className="game-version">V4.0.7</div>
        <Link to="/mode" className="game-button">
          GAME START
        </Link>
      </div> 
    </div>
    </div>
  );
}

export default Welcome;