import './PokemonPage.css';

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Config from 'Config'

export default function PokemonPage(props) {

    const [pokemon, setPokemon] = useState({});

    const { number } = useParams();
    axios.get(Config.apiUrl + number).then(res => {
        setPokemon(res.data)
    }).catch(err => {
        console.log(err);
    });
    
    return(
        <div className="card solo-card">
            <img src={`../images/pokemon/${pokemon.image}`} className="card-img-top" alt="Pokemon image"/>
            <div className="card-body">
            <h5 className="card-title"><strong>#{pokemon.number} - {pokemon.name}</strong></h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Tipo: </strong>{pokemon.type}</li>
                <li className="list-group-item"><strong>Categoria: </strong>{pokemon.category}</li>
                <li className="list-group-item"><strong>Peso: </strong>{pokemon.weight}kg</li>
                <li className="list-group-item"><strong>Altura: </strong>{pokemon.height}m</li>
            </ul>
            <div className="card-body rounded-bottom">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
    );
}