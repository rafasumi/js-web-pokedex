const PokemonRepository = require('../repository/PokemonRepository');
const upload = require('../helpers/image-upload');
const deleteImage = require('../helpers/delete-image');
const NotFoundError = require('../../errors/NotFoundError');
const InvalidFieldError = require('../../errors/InvalidFieldError');

class PokemonService {
    constructor() {}

    async getAll() {
        const results = await PokemonRepository.getAll();
        return results;
    }

    async getByNumber(number) {
        const result = await PokemonRepository.getByNumber(number);

        if(!result) {
            throw new NotFoundError(
                'Não foi possível encontrar um Pokémon com esse número!');
        }

        return result;
    }

    async create(pokemon, image) {
        if(!image) {
            throw new InvalidFieldError('O campo \'imagem\' não pode ficar vazio!');
        }
        const fileName = await upload(image, pokemon.name);
        
        pokemon = { ...pokemon, image: fileName };
        
        await PokemonRepository.create(pokemon);
    }

    async update(number, fields, image) {
        const result = await PokemonRepository.getByNumber(number);
        
        if(!result) {
            throw new NotFoundError(
                'Não foi possível encontrar um Pokémon com esse número!');
        }
        
        if(image) {
            const newFileName = fields.name ? fields.name : result.name;

            const fileName = await upload(image, newFileName);
            fields = {...fields, image: fileName};
        }

        await PokemonRepository.update(fields, number);
    }

    async delete(number) {
        const result = await PokemonRepository.getByNumber(number);

        if(!result) {
            throw new NotFoundError(
                'Não foi possível encontrar um Pokémon com esse número!');
        }
        
        await deleteImage(result.image);

        await PokemonRepository.delete(number);
    }
}

module.exports = new PokemonService();