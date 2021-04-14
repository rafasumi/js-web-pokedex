class FileSizeTooLargeError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'FileSizeTooLargeError';
    }
}

module.exports = FileSizeTooLargeError;