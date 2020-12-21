import './PokemonList.css';

import React, { Component } from 'react';
import axios from 'axios';
import Config from 'Config';

import PokemonCard from '../templates/PokemonCard';
import Pokedex from '../../public/images/pokedex.png';

class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.state = { pokemon: [] };

        this.refresh();
    }
    
    refresh() {
        axios.get(Config.apiUrl)
            .then(res => {
                this.setState({
                    ...this.state,
                    pokemon: res.data
                });
            });
    }

    renderCards() {
        return this.state.pokemon.map(pokemon => (
            <PokemonCard key={pokemon.number} pokemon={pokemon}/>
        ));
    }

    render() {
        return (
            <div className="container">
                <div className="title mt-3">
                    <img src={Pokedex} alt="Poxedex image"/>
                    <h1>Pokédex</h1>
                </div>
                <hr/>
                <div className="pokemonList">
                    {this.renderCards()}
                </div>
            </div>
        );
    }
}

export default PokemonList;