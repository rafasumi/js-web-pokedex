const InvalidFieldError = require('../../errors/InvalidFieldError');

function isValidPokemonNumber(number) {
    if(!isNaN(number) && number <= 151 && number > 0) {
        return true;
    }

    return false;
}

function isValidPokemonStringField(name) {
    if(typeof name === 'string' && name.length > 0) {
        return true
    }

    return false;
}

function isValidPokemonMeasurement(measurement) {
    if(!isNaN(measurement) && measurement > 0) {
        return true;
    }

    return false;
}

const fieldsValidators = {
    'number': isValidPokemonNumber,
    'name': isValidPokemonStringField,
    'height': isValidPokemonMeasurement,
    'weight': isValidPokemonMeasurement,
    'category': isValidPokemonStringField,
    'type': isValidPokemonStringField,
}

function validatePokemon(fields) {
    let validate = undefined;
    
    Object.keys(fieldsValidators).forEach(field => {
        validate = fieldsValidators[field];

        if(!validate(fields[field])) {
            throw new InvalidFieldError(field);
        }
    });
}

module.exports = validatePokemon;