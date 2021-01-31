import React, { useEffect, useState } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import './Loading.css';
import Story from './Story'
import logoDog from '../../images/logodog.png'
import logoForest from '../../images/logoForest.png'


function Loading () {
  const [isStory, setIsStory] = useState(false)
  const [goStory, setGoStory] = useState(false)
  
  useEffect(() => {
    setTimeout(() => {
      setIsStory(true)
    },2500)
    if(isStory) {
      setTimeout(() => {
        setGoStory(true)
      }, 1000)
    }
  })

  return goStory ? <Story /> 
  : (
      <div className="loadingScreen">
      <div className="preload">
      <img className={isStory ? 'logoDogStop' : 'logoDog'} src={logoDog} alt='logoDog' />
      <div className= "loadText">
      <h3>Loading on the Game</h3>
      <div className= "loadAnime">
      <Loader
         type="ThreeDots"
         color="#658261"
         height={100}
         width={100}
         z-index={1}
      />
      </div>
      </div>
      <img className="logoForest" src={logoForest} alt='logoForest' />
      </div>
      </div>
  );
}


export default Loading;