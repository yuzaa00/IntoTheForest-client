import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import './Loading.css';

import logoDog from '../../images/logodog.png'
import logoForest from '../../images/logoForest.png'


function Loading () {
  return (
      <div className="loadingScreen">
      <div className="preload">
      <img className="logoDog" src={logoDog} alt='logoDog' />
      <div className= "loadText">
      <h3>Loading on the Game</h3>
      <div className= "loadAnime">
      <Loader
         type="ThreeDots"
         color="#658261"
         height={100}
         width={100}
         timeout={7000} //3 secs
      />
      </div>
      </div>
      {/* img className="logoForest2" src={logoForest} alt='logoForest2' /> */}
      {/* <img className="logoForest1" src={logoForest} alt='logoForest1' /> */}
      <img className="logoForest" src={logoForest} alt='logoForest' />
      </div>
      </div>
  );
}


export default Loading;