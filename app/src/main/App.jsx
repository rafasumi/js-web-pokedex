import './app.css';
import 'modules/bootstrap/dist/css/bootstrap.min.css';
import 'modules/jquery/dist/jquery.min.js';
import 'modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import { Route, 
    HashRouter as Router, 
    Switch } from 'react-router-dom';
import Navbar from '../templates/Navbar';
import PokemonList from '../pages/PokemonList';
import PokemonPage from '../pages/PokemonPage';
import CreatePokemonForm from '../pages/CreatePokemonForm';
import EditPokemonForm from '../pages/EditPokemonForm';

export default function App(props) {
    return (
        <div>
            <Router>
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={ PokemonList }/>
                    <Route path='/pokemon/:number' component={ PokemonPage }/>
                    <Route path='/registerPokemon' component={ CreatePokemonForm }/>
                    <Route path='/editPokemon/:number' component={ EditPokemonForm }/>
                </Switch>
            </Router>
        </div>
    );
}