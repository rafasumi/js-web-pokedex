import React from 'react';

export default function PokemonCard(props) {
    return(
        <div className="card" >
            <img src={`./images/pokemon/${props.pokemon.image}`} className="card-img-top" alt="Pokemon image"/>
            <div className="card-body">
                <h5 className="card-title">{props.pokemon.name}</h5>
            </div>
            <ul className="list-group list-group-flush" >
                <li className="list-group-item">#{props.pokemon.number}</li>
                <li className="list-group-item">{props.pokemon.type}</li>
            </ul>
        </div>
    );
}