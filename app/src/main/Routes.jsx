import React from 'react';
import { Route, 
        HashRouter as Router, 
        Switch } from 'react-router-dom';

import PokemonList from '../pages/PokemonList';
import PokemonPage from '../pages/PokemonPage';

export default function Routes(props) {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={ PokemonList }/>
                <Route path='/pokemon/:number' component={ PokemonPage }/>
            </Switch>
        </Router>
    );   
}