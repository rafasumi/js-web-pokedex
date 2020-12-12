const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const pokemonRouter = require('../pokemon/controller');
app.use('/pokemon', pokemonRouter);

const errorHandler = require('../middlewares/error-handler');
app.use(errorHandler);

module.exports = app;