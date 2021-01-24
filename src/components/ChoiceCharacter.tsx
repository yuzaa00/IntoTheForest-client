import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

const ChoiceCharacter = () => {
    return (
        <Switch>
            <Route path="/choicedog">
                <div>
                    ChoiceCharacter Page
                </div>
            </Route>
        </Switch>
    )
}

export default ChoiceCharacter;