class InvalidFieldError extends Error {
    constructor(field) {
        super(`O campo ${field} está inválido`);
        this.name = 'InvalidFieldError';
    }
}

module.exports = InvalidFieldError;