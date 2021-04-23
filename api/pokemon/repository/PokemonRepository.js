const Pokemon = require('../model/Pokemon');

class PokemonRepository {
    getAll() {
        return Pokemon.findAll({raw: true});
    }

    getByNumber(number) {
        return Pokemon.findByPk(number);
    }

    create(pokemon) {
        return Pokemon.create(pokemon);
    }

    update(pokemon, number) {
        return Pokemon.update(pokemon, {where: {number: number}});
    }

    delete(number) {
        return Pokemon.destroy({where: {number: number}});
    }
}

module.exports = new PokemonRepository;