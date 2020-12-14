import './PokemonList.css';

import React, { Component } from 'react';
import axios from 'axios';

import PokemonCard from '../templates/PokemonCard';

const URL = 'http://localhost:3000/pokemon/'

class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.state = { pokemon: [] };

        this.refresh();
    }
    
    refresh() {
        axios.get(URL)
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
            <div className="pokemonList">
                {this.renderCards()}
            </div>
        );
    }
}

export default PokemonList;