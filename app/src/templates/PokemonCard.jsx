import './PokemonCard.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function PokemonCard(props) {
    return(
        <div className="card list-card" >
            <img src={`./images/pokemon/${props.pokemon.image}`} className="card-img-top" alt="Pokemon image"/>
            <div className="card-body">
                <h5 className="card-title">#{props.pokemon.number} - {props.pokemon.name}</h5>
                <h6 className="card-title">{props.pokemon.type}</h6>
                <Link to={`/pokemon/${props.pokemon.number}`} className="stretched-link"/>
            </div>
        </div>
    );
}