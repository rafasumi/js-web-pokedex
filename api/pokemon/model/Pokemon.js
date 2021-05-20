const mongoose = require('../../database/');

const pokemonSchema = new mongoose.Schema({
    number: {
        type: Number, 
        required: true, 
        unique: true
    },
    name: {
        type: String, 
        required: true
    },
    height: {
        type: Number, 
        required: true
    },
    weight: {
        type: Number, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    type: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true
    }
}, {autoIndex: false});

const Pokemon = mongoose.model('Pokemon', pokemonSchema, 'pokedex');

module.exports = Pokemon;