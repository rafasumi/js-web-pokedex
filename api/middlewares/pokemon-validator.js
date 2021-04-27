const {body} = require('express-validator');

const validate = (method) => {
    switch (method) {
    case 'create': {
        return [
            body('number')
                .exists()
                .withMessage('O campo de número deve estar preenchido!')
                .isInt({min: 1, max: 151})
                .withMessage(
                    'O número do Pokémon deve ser um inteiro entre 0 e 151!'),
            body('name')
                .exists()
                .withMessage('O campo de nome deve estar preenchido!')
                .isAlpha()
                .withMessage('O campo de nome possui caracteres inválidos'),
            body('height')
                .exists()
                .withMessage('O campo de altura deve estar preenchido!')
                .isFloat({gt: 0})
                .withMessage(
                    'A altura do Pokémon deve ser numérico e maior que 0!'),
            body('weight')
                .exists()
                .withMessage('O campo de peso deve estar preenchido!')
                .isFloat({gt: 0})
                .withMessage('O peso do Pokémon deve ser numérico e maior que 0!'),
            body('category')
                .exists()
                .withMessage('O campo de categoria deve estar preenchido!')
                .isAlpha()
                .withMessage('O campo de categoria possui caracteres inválidos'),
            body('type')
                .exists()
                .withMessage('O campo de tipo deve estar preenchido!')
                .isAlpha()
                .withMessage('O campo de tipo possui caracteres inválidos'),
        ];
    }
    case 'update': {
        return [
            body('name')
                .optional()
                .isAlpha()
                .withMessage('O campo de nome possui caracteres inválidos'),
            body('height')
                .optional()
                .isFloat({gt: 0})
                .withMessage(
                    'A altura do Pokémon deve ser numérico e maior que 0!'),
            body('weight')
                .optional()
                .isFloat({gt: 0})
                .withMessage('O peso do Pokémon deve ser numérico e maior que 0!'),
            body('category')
                .optional()
                .isAlpha()
                .withMessage('O campo de categoria possui caracteres inválidos'),
            body('type')
                .optional()
                .isAlpha()
                .withMessage('O campo de tipo possui caracteres inválidos'),
        ];
    }
    }
};

module.exports = {validate};
