import './Navbar.css';

import React from 'react';
import PokemonLogo from '../../public/images/pokemon-logo.png';
import Pokedex from '../../public/images/pokedex.png';

export default function Navbar(props) {
    return(
        <div className="navbar-wrapper">
            <nav className="navbar navbar-expand-lg navbar-dark bg-red">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img className="brand-image" src={PokemonLogo}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbar">
                        <ul className="nav-list navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Pokédex</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Cadastrar Pokémon</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}