const router = require('express').Router();
const upload = require('../helpers/image-upload');
const deleteImage = require('../helpers/delete-image');
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

        if(!req.files || !req.files.image) {
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

        let fields = req.body;

        let hasImage = false; 
        if(req.files) hasImage = true

        validateUpdateFields(fields, hasImage);
        
        if(hasImage) {
            const newFileName = fields.name ? fields.name : result.name;

            const fileName = await upload(req.files.image, newFileName);
            fields = {...fields, image: fileName};
        }

        await result.update(fields);

        res.status(200);
        res.end();
    } catch(error) {
        next(error);
    }
});

router.delete('/:number', async (req, res, next) => {
    try {
        const number = req.params.number;
        const result = await Pokemon.findByPk(number);

        if(!result) {
            throw new NotFoundError(
                'Não foi possível encontrar um Pokémon com esse número!');
        }
        
        await deleteImage(result.image);

        await result.destroy();

        res.status(200);
        res.end();
    } catch(error) {
        next(error);
    }
});

module.exports = router;
