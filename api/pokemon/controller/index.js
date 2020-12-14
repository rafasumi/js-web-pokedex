const router = require('express').Router();
const upload = require('../helpers/image-upload');
const Pokemon = require('../model/Pokemon');
const { validatePokemon, 
        validateUpdateFields } = require('../helpers/pokemon-validator');
const NotFoundError = require('../../errors/NotFoundError');
const InvalidFieldError = require('../../errors/InvalidFieldError');

router.get('/', async (req, res) => {
    const results = await Pokemon.findAll({raw: true});

    res.status(200);
    res.send(results);
});

router.get('/:number', async (req, res, next) => {
    try {
        const number = req.params.number;

        const result = await Pokemon.findByPk(number);

        if(!result) {
            throw new NotFoundError(
                'Não foi possível encontrar um Pokémon com esse número!');
        }
    
        res.status(200);
        res.send(result);   
    } catch(error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let fields = req.body;
        
        validatePokemon(fields);

        if(!req.files) {
            throw new InvalidFieldError('O campo \'imagem\' não pode ficar vazio!');
        }
        const fileName = await upload(req.files.image, fields.name);
        
        fields = { ...fields, image: fileName };
        
        const result = await Pokemon.create(fields);

        res.status(200);
        res.send(result);
    } catch(error) {
        next(error);
    }
});

router.put('/:number', async (req, res, next) => {
    try {
        const number = req.params.number;
        const result = await Pokemon.findByPk(number);
        
        if(!result) {
            throw new NotFoundError(
                'Não foi possível encontrar um Pokémon com esse número!');
        }

        const fields = req.body;

        validateUpdateFields(fields);

        await result.update(fields);

        res.status(200);
        res.end();
    } catch(error) {
        next(error);
    }
});

router.delete('/:number', async (req, res) => {
    try {
        const number = req.params.number;
        const result = await Pokemon.findByPk(number);

        if(!result) {
            throw new NotFoundError(
                'Não foi possível encontrar um Pokémon com esse número!');
        }

        result.destroy();

        res.status(200);
        res.end();
    } catch(error) {
        next(error);
    }
});

module.exports = router;
