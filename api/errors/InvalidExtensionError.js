class InvalidExtensionError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'InvalidExtensionError';
    }
}

module.exports = InvalidExtensionError;