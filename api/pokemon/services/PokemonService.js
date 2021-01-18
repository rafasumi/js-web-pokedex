const Pokemon = require('../model/Pokemon');
const { validatePokemon, 
        validateUpdateFields } = require('../helpers/pokemon-validator');
const upload = require('../helpers/image-upload');
const deleteImage = require('../helpers/delete-image');
const NotFoundError = require('../../errors/NotFoundError');
const InvalidFieldError = require('../../errors/InvalidFieldError');

class PokemonService {
    constructor() {}

    async getAll() {
        const results = await Pokemon.findAll({raw: true});
        return results;
    }

    async getByNumber(number) {
        const result = await Pokemon.findByPk(number);

        if(!result) {
            throw new NotFoundError(
                'Não foi possível encontrar um Pokémon com esse número!');
        }

        return result;
    }

    async create(pokemon, files) {
        validatePokemon(pokemon);

        if(!files || !files.image) {
            throw new InvalidFieldError('O campo \'imagem\' não pode ficar vazio!');
        }
        const fileName = await upload(files.image, pokemon.name);
        
        pokemon = { ...pokemon, image: fileName };
        
        const result = await Pokemon.create(pokemon);

        return result;
    }

    async update(number, fields, files) {
        const result = await Pokemon.findByPk(number);
        
        if(!result) {
            throw new NotFoundError(
                'Não foi possível encontrar um Pokémon com esse número!');
        }

        let hasImage = false; 
        if(files) hasImage = true

        validateUpdateFields(fields, hasImage);
        
        if(hasImage) {
            const newFileName = fields.name ? fields.name : result.name;

            const fileName = await upload(files.image, newFileName);
            fields = {...fields, image: fileName};
        }

        await result.update(fields);
    }

    async delete(number) {
        const result = await Pokemon.findByPk(number);

        if(!result) {
            throw new NotFoundError(
                'Não foi possível encontrar um Pokémon com esse número!');
        }
        
        await deleteImage(result.image);

        await result.destroy();
    }
}

module.exports = new PokemonService();