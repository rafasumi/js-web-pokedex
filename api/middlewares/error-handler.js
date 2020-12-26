const { UniqueConstraintError } = require('sequelize');
const EmptyFieldsError = require('../errors/EmptyFieldsError');
const InvalidFieldError = require('../errors/InvalidFieldError');
const InvalidExtensionError = require('../errors/InvalidExtensionError');
const NotFoundError = require('../errors/NotFoundError');

function errorHandler(error, req, res, next) {
    let status = 500;
    let message = ''

    if(error instanceof EmptyFieldsError || 
        error instanceof InvalidFieldError ||
        error instanceof InvalidExtensionError) {
        status = 400;
        message = error.message;
    }
    
    if(error instanceof NotFoundError) {
        status = 404;
        message = error.message;
    }

    if(error instanceof UniqueConstraintError) {
        status = 409;
        message = 'Já foi cadastrado um Pokémon com esse número e/ou com esse nome!';
    }

    res.status(status);
    res.send({error: { message, name: error.name }});
}

module.exports = errorHandler;