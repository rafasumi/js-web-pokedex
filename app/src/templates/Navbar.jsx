import './Navbar.css';

import React from 'react';
import { Link } from 'react-router-dom';

import PokemonLogo from '../../public/images/pokemon-logo.png';

export default function Navbar(props) {
    return(
        <div className="navbar-wrapper">
            <nav className="navbar navbar-expand-lg navbar-dark bg-red">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img className="brand-image" src={PokemonLogo}/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbar">
                        <ul className="nav-list navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Pokédex</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" 
                                    to={{
                                        pathname: "/registerPokemon",
                                        state: {
                                            isRegister: true
                                        }
                                    }}>Cadastrar Pokémon</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}