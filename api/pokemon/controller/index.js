const router = require('express').Router();
const upload = require('../helpers/multer-config');
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

router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        let fields = req.body;
        
        validatePokemon(fields);

        if(req.file === undefined) {
            throw new InvalidFieldError('O campo \'imagem\' não pode ficar vazio!');
        }

        fields = { ...fields, image: req.file.filename };
        
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
