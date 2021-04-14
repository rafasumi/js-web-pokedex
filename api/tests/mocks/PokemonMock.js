const SequelizeMock = require('sequelize-mock-v5');
const dbMock = new SequelizeMock();

const PokemonMock = dbMock.define('Pokemon', {
    number: 25,
    name: 'Pikachu',
    height: 0.4,
    weight: 6,
    category: 'Mouse',
    type: 'Electric',
    image: 'pikachu.png'
}, {timestamps: false});

PokemonMock.$queryInterface.$useHandler((query, queryOptions, done) => {
    if (query === 'findAll') {
        const limit = queryOptions[0].limit ?? 10;
        const result = [];
        
        for (let i = 0; i < limit; i++) {
            result.push(PokemonMock.build({ 
                number: i, 
                name: 'Pokémon ' + i, 
                height: i * 1.5, 
                weight: i * 2,
                category: 'Category ' + i,
                type: 'Normal',
                image: `pokemon${i}.png`
            }));
        }
        
        return result;
    } else if (query === 'findByPk') {
        const allowedNumbers = [1, 2, 3, 4, 25];
        const number = parseInt(queryOptions[0]);
        
        if (allowedNumbers.indexOf(number) !== -1) {
            return PokemonMock.build({
                number: number, 
                name: 'Pokémon ' + number, 
                height: number * 1.5, 
                weight: number * 2,
                category: 'Category ' + number,
                type: 'Normal',
                image: `pokemon${number}.png`
            });
        } else {
            return null;
        }
    } else if (query === 'create') {
        return PokemonMock.build(queryOptions[0]);
    }
});



module.exports = PokemonMock;