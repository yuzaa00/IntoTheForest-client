import React from 'react';
import './Loading.css';
import logoDog from '../../assets/images/loading/logodog.png'
import logoForest from '../../assets/images/loading/logoForest.png'


function Loading () {



    

  return (
      <div>

      <div className="preload">
      <img className="logoDog" src={logoDog} alt='logoDog' />
      <h3>Loading on the Game . . .</h3>
      <img className="logoForest" src={logoForest} alt='logoForest' />
      <img className="logoForest1" src={logoForest} alt='logoForest1' />
      <img className="logoForest2" src={logoForest} alt='logoForest2' />
      </div>
      
      </div>
  );
}


export default Loading;