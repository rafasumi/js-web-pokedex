const multer = require('multer');
const path = require('path');
const config = require('config');
const InvalidExtensionError = require('../../errors/InvalidExtensionError');

function checkFileExtension(file, callback) {
    const allowedExtensions = config.get('api.allowedExtensions');
    const extension = path.extname(file.originalname);

    const isValidExtension = allowedExtensions.indexOf(
        extension.substring(1).toLowerCase()) !== -1;

    if(isValidExtension) {
        callback(null, true);
    } else {
        callback(new InvalidExtensionError(
            `A extensão de arquivo '${extension}' não é válida!`), false);
    }
}

const uploadFolder = path.resolve(__dirname, '../../../app/public/images/pokemon')
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, uploadFolder);
    },
    filename: function(req, file, callback) {
        const extension = path.extname(file.originalname);
        callback(null, req.body.name.toLowerCase() + extension);
    }
});

module.exports = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        checkFileExtension(file, callback);
    }
});