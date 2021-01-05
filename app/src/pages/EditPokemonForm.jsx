import './PokemonForm.css';

import React, { useEffect, useState } from 'react';
import { MdError } from 'react-icons/md';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Config from 'Config';
import FormData from 'form-data';
import $ from 'jquery';

export default function EditPokemonForm(props) {
    const [pokemon, setPokemon] = useState({});
    const [file, setFile] = useState(null);
    
    const [error, setError] = useState(null);
    const errorDiv = error
    ? <div className="alert alert-danger my-auto" role="alert"><MdError className="mr-2"/>{error.message}</div>
    : '' 
    
    const history = useHistory();

    const { number } = useParams();
    useEffect(() => {
        axios.get(Config.apiUrl + number).then(res => {
            setPokemon(res.data)
        }).catch(err => {
            console.log(err);
        });

        $('#image').on('change', function() {
            var fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
            $(this).next('.custom-file-label').html(fileName);
        });
    }, []);
    
    const handleEdit = () => {
        const formData = new FormData();
        formData.append('name', pokemon.name);
        formData.append('type', pokemon.type);
        formData.append('category', pokemon.category);
        formData.append('weight', pokemon.weight);
        formData.append('height', pokemon.height);
        if(file) {
            formData.append('image', file);
        }
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        axios.put(Config.apiUrl + pokemon.number, formData, config)
            .then(res => {
                if(res.status === 200) {
                    history.push(`/pokemon/${pokemon.number}`);
                } 
            })
            .catch(res => setError(res.response.data.error));
    }
    
    const onFormSubmit = (e) => {
        e.preventDefault();
        handleEdit();
    }

    return(
        <div className="container">
            <h1 className="mt-3">Editar Pokémon</h1>
            <hr/>
            {errorDiv}
            <form onSubmit={onFormSubmit}>
                <div className="row g-3 align-items-center my-3">
                    <fieldset disabled>
                        <div className="col-auto">
                            <label htmlFor="number" className="form-label">Número</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                id="number"
                                value={pokemon.number}/>
                        </div>
                    </fieldset>
                </div>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name"
                        value={pokemon.name}
                        onChange={e => setPokemon({...pokemon, name: e.target.value})}/>
                </div>
                <div className="row g-3 align-items-center my-3">
                    <div className="col-md">
                        <label htmlFor="type" className="form-label">Tipo</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="type"
                            value={pokemon.type}
                            onChange={e => setPokemon({...pokemon, type: e.target.value})}/>
                    </div>
                    <div className="col-md">
                        <label htmlFor="category" className="form-label">Categoria</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="category"
                            value={pokemon.category}
                            onChange={e => setPokemon({...pokemon, category: e.target.value})}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center my-3">
                    <div className="col-md">
                        <label htmlFor="height" className="form-label">Altura</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="height"
                            value={pokemon.height}
                            onChange={e => setPokemon({...pokemon, height: e.target.value})}/>
                    </div>
                    <div className="col-md">
                        <label htmlFor="weight" className="form-label">Peso</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="weight"
                            value={pokemon.weight}
                            onChange={e => setPokemon({...pokemon, weight: e.target.value})}/>
                    </div>
                </div>
                <div className="custom-file my-3">
                    <input 
                        type="file" 
                        className="custom-file-input" 
                        id="image" 
                        onChange={e => setFile(e.target.files[0])}/>
                    <label className="custom-file-label" htmlFor="image">{pokemon.image}</label>
                </div>
                <button type="submit" className="btn btn-success mt-3">Editar</button>
            </form>
        </div>
    );
}