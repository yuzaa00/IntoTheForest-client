import { Switch, Route } from 'react-router-dom';

import Welcome from './Welcome/Welcome' //랜딩페이지
import ChoiceMode from './Mode/ChoiceMode'; 
import Ready from './Ready/Ready'
import Room from './Room/Room';
import Game from './Game/Game';
import Result from './Result/Result';
import Test from './Test'

function App() {

  return (
    // <Test></Test>
    <Switch>
      <Route exact path='/' component={Welcome} /> 
      <Route path='/mode' component={ChoiceMode} /> 
      <Route path='/ready' component={Ready} /> 
      <Route path='/room' component={Room} />
      <Route path='/game' component={Game} />
      <Route path='/result' component={Result} />
    </Switch>
  )
}

export default App;