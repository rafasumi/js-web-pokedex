class EmptyFieldsError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'EmptyFieldsError';
    }
}

module.exports = EmptyFieldsError;