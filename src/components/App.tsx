import { Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Welcome from './Welcome/Welcome' //랜딩페이지
import ChoiceMode from './Mode/ChoiceMode'; 
import Ready from './Ready/Ready'
import Room from './Room/Room';
import Game from './Game/Game';
import Result from './Result/Result';
import SingleResult from '../components/Result/SingleResult'
import LoadingRoom from './Room/LoadingRoom'

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch({
      type: 'SAVE_CLIENT_WIDTH',
      value: document.body.clientWidth
    })
  }, [])

   return (
     <div>
    <Switch>
      <Route exact path='/' component={Welcome} /> 
      <Route path='/mode' component={ChoiceMode} /> 
      <Route path='/ready' component={Ready} /> 
      <Route path='/rooms/:id' component={Room} />
      <Route path='/game' component={Game} />
      <Route path='/result' component={Result} />
      <Route path='/SingleResult' component={SingleResult} />
      <Route path='/LoadingRoom' component={LoadingRoom} />
    </Switch>
     </div>

  )
}

export default App;