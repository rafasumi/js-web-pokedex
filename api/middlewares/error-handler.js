const EmptyFieldsError = require('../errors/EmptyFieldsError');
const InvalidFieldError = require('../errors/InvalidFieldError');
const NotFoundError = require('../errors/NotFoundError');

function errorHandler(error, req, res, next) {
    let status = 500;

    if(error instanceof EmptyFieldsError || error instanceof InvalidFieldError) {
        status = 400;
    }
    
    if(error instanceof NotFoundError) {
        status = 404;
    }

    res.status(status);
    res.send(error.message);
}

module.exports = errorHandler;