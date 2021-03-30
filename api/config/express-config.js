const express = require('express');
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const cors = require('cors');
app.use(cors());

const pokemonRouter = require('../pokemon/controller');
app.use('/pokemon', pokemonRouter);

const errorHandler = require('../middlewares/error-handler');
app.use(errorHandler);

module.exports = app;