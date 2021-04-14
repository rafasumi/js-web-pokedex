const request = require('supertest');
const app = require('../../../config/express-config');

jest.mock('../../../pokemon/model/Pokemon', () => {
    return require('../../mocks/PokemonMock');
});

describe('GET /pokemon/', () => {
    test('Deve retornar status 200', async () => {
        const response = await request(app).get('/pokemon/');
        expect(response.status).toBe(200);
    });
});

describe('GET /pokemon/:number', () => {
    test('Deve retornar status 200', async () => {
        const response = await request(app).get('/pokemon/25');
        expect(response.status).toBe(200);
    });
});

describe('GET /pokemon/:number', () => {
    test('Deve retornar status 404 caso não exista', async () => {
        const response = await request(app).get('/pokemon/24');
        expect(response.status).toBe(404);
    });
});

describe('GET /pokemon/:number', () => {
    test('Deve retornar o conteúdo certo', async () => {
        const response = await request(app).get('/pokemon/25');
        expect(response.body).toMatchObject({
            number: 25,
            name: 'Pokémon 25',
            height: 37.5,
            weight: 50,
            category: 'Category 25',
            type: 'Normal',
            image: 'pokemon25.png'
        });
    });
});
