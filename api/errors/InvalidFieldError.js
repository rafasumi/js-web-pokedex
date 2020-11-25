class InvalidFieldError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'InvalidFieldError';
    }
}

module.exports = InvalidFieldError;