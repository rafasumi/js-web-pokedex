const Pokemon = require('../model/Pokemon');

class PokemonRepository {
    getAll() {
        return Pokemon.find({}).lean().exec();
    }

    async getByNumber(number) {
        const result = await Pokemon.find({number: number}).lean().exec();

        if (result.length === 0) {
            return undefined;
        } else {
            return result[0];
        }
    }

    async create(pokemon) {
        const query = new Pokemon(pokemon);
        await query.save();
    }

    async update(pokemon, number) {
        await Pokemon.findOneAndUpdate(
            {number: number}, 
            pokemon, 
            {useFindAndModify: true}
        ).exec();
    }

    async delete(number) {
        await Pokemon.findOneAndDelete(
            {number: number}, 
            {useFindAndModify: true}
        ).exec();
    }
}

module.exports = new PokemonRepository;