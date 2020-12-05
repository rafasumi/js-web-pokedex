const InvalidFieldError = require('../../errors/InvalidFieldError');
const EmptyFieldsError = require('../../errors/EmptyFieldsError');

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
    'type': isValidPokemonStringField
}

const fieldsTranslations = {
    'number': 'número',
    'name': 'nome',
    'height': 'altura',
    'weight': 'peso',
    'category': 'categoria',
    'type': 'tipo'
}

function validatePokemon(fields) {
    let validate = undefined;
    
    Object.keys(fields).forEach(field => {
        validate = fieldsValidators[field];

        if(validate === undefined) {
            throw new InvalidFieldError(`O campo "${field}" não existe!`);
        }

        if(!validate(fields[field])) {
            throw new InvalidFieldError(
                `O campo "${fieldsTranslations[field]}" está inválido!`);
        }
    });
}

function validateUpdateFields(fields) {
    const fieldsKeys = Object.keys(fields);
    
    if(fieldsKeys.length === 0) {
        throw new EmptyFieldsError(
            'Não foram fornecidos campos para atualizar o Pokémon!');
    }
    
    let validate = undefined;

    fieldsKeys.forEach(field => {
        if(field === 'number') {
            throw new InvalidFieldError(
                'O campo número não pode ser atualizado!')
        }

        validate = fieldsValidators[field];

        if(validate === undefined) {
            throw new InvalidFieldError(
                `O campo "${field}" não existe!`);
        }

        if(!validate(fields[field])) {
            throw new InvalidFieldError(
                `O campo "${fieldsTranslations[field]}" está inválido!`);
        }
    });
}

module.exports = {
    validatePokemon: validatePokemon,
    validateUpdateFields: validateUpdateFields
};