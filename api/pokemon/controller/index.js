const router = require('express').Router();
const PokemonService = require('../services/PokemonService');

router.get('/', async (req, res) => {
    const results = await PokemonService.getAll();

    res.status(200);
    res.json(results);
});

router.get('/:number', async (req, res, next) => {
    try {
        const result = await PokemonService.getByNumber(req.params.number);

        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const fields = req.body;
        await PokemonService.create(fields, req.files);

        res.status(204).end();
    } catch(error) {
        next(error);
    }
});

router.put('/:number', async (req, res, next) => {
    try {
        const pokemonNumber = req.params.number
        const fields = req.body;
        await PokemonService.update(pokemonNumber, fields, req.files);

        res.status(200).end();
    } catch(error) {
        next(error);
    }
});

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
