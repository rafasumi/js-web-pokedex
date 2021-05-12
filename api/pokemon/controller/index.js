const router = require('express').Router();
const {validationResult} = require('express-validator');
const {pokemonValidate} = require('../../middlewares/pokemon-validator');
const {requestFilter} = require('../../middlewares/object-filter');
const PokemonService = require('../services/PokemonService');

router.get('/', async (req, res) => {
    const results = await PokemonService.getAll();

    res.status(200).json(results);
});

router.get('/:number', async (req, res, next) => {
    try {
        const result = await PokemonService.getByNumber(req.params.number);

        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
});

router.post('/',
    requestFilter('body', [
        'number', 
        'name', 
        'height', 
        'weight', 
        'category', 
        'type'
    ]),
    pokemonValidate('create'),
    async (req, res, next) => {
        try {
            const fields = req.body;
            const image = req.files ? req.files.image : undefined;
            await PokemonService.create(fields, image);

            res.status(201).end();
        } catch(error) {
            next(error);
        }
    }
);

router.put('/:number',
    requestFilter('body', [
        'name', 
        'height', 
        'weight', 
        'category', 
        'type'
    ]),
    pokemonValidate('update'),
    async (req, res, next) => {
        try {
            const pokemonNumber = req.params.number
            const fields = req.body;
            const image = req.files ? req.files.image : undefined;
            await PokemonService.update(pokemonNumber, fields, image);

            res.status(200).end();
        } catch(error) {
            next(error);
        }
    }
);

router.delete('/:number', async (req, res, next) => {
    try {
        const pokemonNumber = req.params.number;
        await PokemonService.delete(pokemonNumber);

        res.status(200).end();
    } catch(error) {
        next(error);
    }
});

module.exports = router;
