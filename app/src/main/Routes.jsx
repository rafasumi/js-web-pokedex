import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import PokemonList from '../pages/PokemonList';

export default function Routes(props) {
    return (
        <Router>
            <Switch>
                <Route path='/' component={ PokemonList }/>
            </Switch>
        </Router>
    );   
}