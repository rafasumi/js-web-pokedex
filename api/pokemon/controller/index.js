const router = require('express').Router();
const Pokemon = require('../model/Pokemon');
const validatePokemon = require('../helpers/PokemonValidator');
const NotFoundError = require('../../errors/NotFoundError');

router.get('/', async (req, res) => {
    const results = await Pokemon.findAll({raw: true});

    res.status(200);
    res.send(results);
});

router.get('/:number', async (req, res) => {
    try {
        const number = req.params.number;

        const result = await Pokemon.findByPk(number);

        if(!result) {
            throw new NotFoundError('Não foi possível encontrar um Pokémon com esse número!');
        }
    
        res.status(200);
        res.send(result);   
    } catch(error) {
        res.status(404);
        res.send(error.message);
    }
});

router.post('/', async (req, res) =>{
    try {
        const fields = req.body;
        
        validatePokemon(fields);
        
        const result = await Pokemon.create(fields);

        res.status(200)

        res.send(result);
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
});

module.exports = router;
