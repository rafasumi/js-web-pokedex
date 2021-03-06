import './PokemonPage.css';

import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Config from 'Config';

export default function PokemonPage(props) {
    const [pokemon, setPokemon] = useState({});

    const history = useHistory();

    const { number } = useParams();
    useEffect(() => {        
        axios.get(Config.apiUrl + number).then(res => {
            setPokemon(res.data)
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const handleDelete = (e) => {
        const confirmed = confirm(`Você deseja mesmo deletar o Pokémon ${pokemon.name}?`);
        
        if(confirmed) {
            axios.delete(Config.apiUrl + pokemon.number).then(res => {
                if(res.status === 200) {
                    history.push('/');
                }
            }).catch(res => console.log(res));
        }
    }
    
    return(
        <div className="container">
            <div className="card solo-card">
                <img src={`../images/pokemon/${pokemon.image}`} className="card-img-top" alt="Pokemon image"/>
                <div className="card-body">
                <h3 className="card-title my-auto"><strong>#{pokemon.number} - {pokemon.name}</strong></h3>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Tipo: </strong>{pokemon.type}</li>
                    <li className="list-group-item"><strong>Categoria: </strong>{pokemon.category}</li>
                    <li className="list-group-item"><strong>Peso: </strong>{pokemon.weight}kg</li>
                    <li className="list-group-item"><strong>Altura: </strong>{pokemon.height}m</li>
                </ul>
                <div className="card-body rounded-bottom actions">
                    <button className="btn btn-danger" onClick={handleDelete}><FaTrashAlt/></button>
                    <Link to={`/editPokemon/${pokemon.number}`} className="btn btn-primary"><FaEdit/></Link>
                </div>
            </div>
        </div>
    );
}