import React, { useState, useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import SingleResult from '../Result/SingleResult';
import Loading from './Loading';
import Story from './Story'
import ChoiceCharacter from './ChoiceCharacter'
import Control from './Control'


function Ready() {

  return (
    <div style={{width: '100%', height: '100vh', background: 'linear-gradient(75deg,#755bea,#ff72c0)', display: 'flex'}}>
    <div className="solo_mode" style={{    
      margin: '0 auto',
      alignSelf: 'center'
      }}>
  
    <Switch>
      <Route path='/ready/loading' component={Loading} /> 
      <Route path='/ready/story' component={Story} /> 
      <Route path='/ready/character' component={ChoiceCharacter} /> 
      <Route path='/ready/control' component={Control} />
    </Switch>
    </div>
    </div>
  );
}

export default Ready;